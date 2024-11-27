'use client';
import { UpdateNewCount } from '@/actions/count';
import { useRouter } from 'next/navigation';
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface UpdateCountProps {
  streakId: string;
  totalCount: number;
  unit: string;
  lastChecked: Date;
  streakCount: number;
  formRef: RefObject<HTMLFormElement>; // Accept formRef as a prop
}

export default function UpdateCount({
  streakId,
  totalCount,
  unit,
  formRef,
  streakCount,
}: UpdateCountProps) {
  const router = useRouter();
  // create a ref for the addedCount input to be cleared on render
  const addedCountRef = useRef<HTMLInputElement | null>(null);
  const [total, setTotal] = useState(totalCount);
  const [showBanner, setShowBanner] = useState(false);

  // Clear addedCount on render or when total updates
  useEffect(() => {
    if (addedCountRef.current) {
      addedCountRef.current.value = ''; // Clear the input
    }
  }, [total]); // Clear whenever total changes

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addedCount = Number(formData.get('addedCount') || 0);

    formData.set('totalCount', String(total + addedCount));

    const { totalCount: newTotalCount, streakCount: updatedStreakCount } =
      await UpdateNewCount(formData);

    // Check if the streak increased and redirect to success page if it did
    if (streakCount < updatedStreakCount) {
      router.push(`/success?count=${updatedStreakCount}`);
    }

    // Update local state with the new total count and streak count
    setTotal(newTotalCount);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  };

  return (
    <div className='mb-4 flex flex-col items-center justify-center'>
      {showBanner && (
        <div className='absolute top-0 w-full justify-center rounded-xl border-4 border-green-900 bg-green-500 p-4'>
          <div className='flex flex-row items-center justify-center'>
            <h3 className='text-center text-xl'>Updated Count</h3>
            <Image
              src={'/streakFire.svg'}
              width={15}
              height={15}
              alt='logo'
              className='ml-2'
            />
          </div>
        </div>
      )}
      <form ref={formRef} onSubmit={update} className='size-full'>
        {/*stores the id of the streak being updated*/}
        <div className='flex flex-col items-center justify-center'>
          <input type='hidden' name='id' value={streakId} />
          <input type='hidden' name='totalCount' value={totalCount} />
          <input type='hidden' name='unit' value={unit} />
          <div className='flex w-full flex-col pb-4'>
            <h3 className='text-center font-title text-xl'>Total</h3>
            <div className='flex w-full flex-row items-center justify-center gap-1'>
              <h4 className='text-center text-2xl'>{`${total}`}</h4>
              <h4 className='text-center text-2xl'>{`${unit} Counted`}</h4>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <label
              className='pb-2 text-center font-title text-xl'
              htmlFor='addedCount'
            >
              Enter Today&apos;s Count
            </label>
            <input
              type='number'
              min={0}
              name='addedCount'
              id='addedCount'
              className='rounded-lg border border-purple-700 bg-slate-300 p-2 text-black shadow-sm placeholder:text-purple-400 focus:outline-none focus:ring focus:ring-purple-500'
              ref={addedCountRef}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
