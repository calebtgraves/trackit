'use client';
import CreateBanner from '@/app/components/dashboard/CreateBanner';
import createTime from '@/actions/time';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CreateTimePage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push('/login');
  }
  const userId = session?.user?.id;

  const [reportType, setReportType] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createTime(formData);
    router.push('/create/planned');
  };
  return (
    <div className='flex h-screen flex-col bg-gradient-to-bl from-purple-600 to-purple-800'>
      <CreateBanner
        src={'/time.svg'}
        color={'bg-[#C084FC]'}
        backgroundColor={'border-b-purple-900 border-b-4'}
        text={'New Time It Streak'}
      />
      <div className='mx-auto flex h-full flex-col p-4 sm:w-full md:w-3/4 lg:w-1/2'>
        <form
          onSubmit={handleSubmit}
          className='flex h-full flex-col gap-6 rounded-lg bg-purple-900 p-6 shadow-lg'
        >
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'time'} />

          {/* Name Input */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='name'
              className='text-xl font-semibold text-purple-200'
            >
              Name your Streak
            </label>
            <input
              type='text'
              name='name'
              className='rounded-md border border-purple-700 bg-purple-800 p-3 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
            />
          </div>

          {/* Goal Textarea */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='goal'
              className='text-xl font-semibold text-purple-200'
            >
              Record your Goal
            </label>
            <textarea
              name='goal'
              rows={4}
              minLength={1}
              maxLength={64}
              defaultValue={''}
              className='resize-none rounded-md border border-purple-700 bg-purple-800 p-3 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
            />
          </div>

          {/* Report Time Select */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='reportType'
              className='text-xl font-semibold text-purple-200'
            >
              Report Time In
            </label>
            <select
              name='reportType'
              id='reportType'
              defaultValue={reportType}
              className='rounded-md border border-purple-700 bg-purple-800 p-3 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value='default'>Select Unit</option>
              <option value='seconds'>Seconds - S</option>
              <option value='minutes'>Minutes - M:S </option>
              <option value='hours'>Hours - H:M:S </option>
              <option value='StartEndTime'>Range - H:M:S / H:M:S </option>
            </select>
          </div>

          {/* Buttons */}
          <div className='grid grid-cols-2 gap-4'>
            <button
              type='submit'
              className='rounded-md bg-[#C084FC] p-3 text-lg font-bold text-purple-900 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-400'
            >
              Start It
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className='rounded-md bg-purple-700 p-3 text-lg font-bold text-purple-200 hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-400'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
