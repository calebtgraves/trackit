import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
import prisma from './lib/db';
import type { Provider } from 'next-auth/providers';

class InvalidLoginError extends CredentialsSignin {
  constructor() {
    super('Invalid credentials', { code: 'credentials' });
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'email', type: 'text' },
      password: { label: 'password', type: 'password' },
    },
    async authorize(credentials) {
      console.log(credentials);
      if (!credentials?.email || !credentials?.password) {
        throw new InvalidLoginError();
      }
      const email = credentials?.email as string;
      const passwords = credentials?.password as string;

      // Replace this with your own authentication logic
      const user = await prisma.users.findUnique({
        where: { email: email },
      });
      console.log(user);

      if (!user || !user.password) {
        console.log('User not found or password not found');
        throw new InvalidLoginError();
      }
      console.log(user.password);

      //   const isValidPassword = await bcrypt.compare(passwords, user.password);

      const isValidPassword = user.password === passwords;
      if (!isValidPassword) {
        console.log('Invalid password');
        throw new InvalidLoginError();
      }
      console.log(user);
      const userwithoutpassword = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      console.log(userwithoutpassword);

      return userwithoutpassword;
    },
  }),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers,
  trustHost: true,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
});
