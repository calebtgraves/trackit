'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='flex w-full flex-col items-center justify-center'>
      <div className='relative flex w-full flex-row rounded-b-xl border-b-4 border-b-purple-950 bg-purple-900 py-5'>
        <div className='flex w-full flex-row items-center justify-center'>
          <h1 className='text-center font-title text-3xl text-white md:text-4xl lg:text-5xl'>
            TrackIt
          </h1>
        </div>
        <div className='absolute right-[2%] top-[5%] rounded-full border-4 border-purple-900 bg-violet-800 p-2 lg:top-[10%]'>
          <ul>
            <li>
              <Link href={'/settings'}>
                <Image
                  src={'/settings.svg'}
                  width={40}
                  height={40}
                  alt='logo'
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
