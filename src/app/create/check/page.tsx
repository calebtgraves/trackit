'use client';
import createCheck from '@/actions/check';
import CreateBanner from '@/app/components/dashboard/CreateBanner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function CreateCheckPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push('/login');
  }
  const userId = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createCheck(formData);
    router.push('/create/planned');
  };
  return (
    <div className='flex h-screen flex-col bg-gradient-to-bl from-purple-600 to-purple-800'>
      <CreateBanner
        src={'/check.svg'}
        color={'bg-green-500'}
        backgroundColor={'border-b-green-900 border-b-4'}
        text={'New Check It Streak'}
      />
      <div className='mx-auto flex h-full flex-col p-4 sm:w-full md:w-3/4 lg:w-1/2'>
        <form
          onSubmit={handleSubmit}
          className='mx-auto flex h-full flex-col gap-5 rounded-lg bg-purple-900 p-6 shadow-lg'
        >
          <div className='grid h-full grid-cols-2 grid-rows-4 gap-5'>
            {/* Hidden Inputs */}
            <input type='hidden' name='userId' value={userId} />
            <input type='hidden' name='type' value={'check'} />

            {/* Name Input */}
            <div className='col-span-2 row-span-1 flex flex-col gap-2'>
              <label
                htmlFor='name'
                className='text-2xl font-semibold text-purple-200'
              >
                Name your Streak
              </label>
              <input
                type='text'
                name='name'
                className='rounded-md border border-purple-700 bg-purple-800 p-4 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
              />
            </div>

            {/* Goal Textarea */}
            <div className='col-span-2 row-span-2 flex flex-col gap-2'>
              <label
                htmlFor='goal'
                className='text-2xl font-semibold text-purple-200'
              >
                Record your goal
              </label>
              <textarea
                name='goal'
                rows={5}
                cols={50}
                defaultValue={''}
                className='resize-none rounded-md border border-purple-700 bg-purple-800 p-4 text-lg text-purple-200 shadow-sm focus:outline-none focus:ring focus:ring-purple-500'
              />
            </div>

            {/* Buttons */}
            <div className='col-span-1 my-auto'>
              <button
                type='submit'
                className='w-full rounded-md bg-[#C084FC] p-3 text-lg font-bold text-purple-900 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-400'
              >
                Start It
              </button>
            </div>
            <div className='col-span-1 my-auto'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
                className='w-full rounded-md bg-purple-700 p-3 text-lg font-bold text-purple-200 hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-400'
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
