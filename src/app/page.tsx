'use server';

import { redirect } from 'next/navigation';
import Main from './components/main';
import Nav from './components/nav';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  return (
    <div className='grid max-h-screen min-h-dvh w-full grid-cols-1 grid-rows-10'>
      {/* Navbar/header */}
      <div className='row-span-1 size-full'>
        <Nav />
      </div>

      {/* page Content */}
      <div className='row-span-9 size-full'>
        <Main />
      </div>
    </div>
  );
}
