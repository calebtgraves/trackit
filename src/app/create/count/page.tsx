'use client';
import createCount from '@/actions/count';
import CreateBanner from '@/app/components/dashboard/CreateBanner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateCountPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push('/login');
  }
  const userId = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createCount(formData);
    router.push('/create/planned');
  };
  return (
    <div className='flex h-screen flex-col bg-gradient-to-bl from-purple-600 to-purple-800'>
      <CreateBanner
        src={'/count.svg'}
        color={'bg-[#3B82F6]'}
        backgroundColor={'border-b-blue-900 border-b-4'}
        text={'New Count It Streak'}
      />
      <div className='mx-auto flex h-full flex-col p-4 sm:w-full md:w-3/4 lg:w-1/2'>
        <form
          action={createCount}
          onSubmit={handleSubmit}
          className='flex h-full flex-col gap-6 rounded-lg bg-purple-900 p-6 shadow-lg'
        >
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'count'} />

          {/* Name Field */}
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
              placeholder='e.g., Daily Exercise'
            />
          </div>

          {/* Unit Field */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='unit'
              className='text-xl font-semibold text-purple-200'
            >
              Counted Item Name
            </label>
            <input
              type='text'
              name='unit'
              className='rounded-md border border-purple-700 bg-purple-800 p-3 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
              placeholder='e.g., Push-ups'
            />
          </div>

          {/* Goal Field */}
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
              placeholder='e.g., 50 per day'
            />
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
