'use client';
import { UpdateNewQuantity } from '@/actions/quanity';
import { useRouter } from 'next/navigation';
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface UpdateCountProps {
  streakId: string;
  totalQuantity: number;
  unit: string;
  lastChecked: Date;
  streakCount: number;
  formRef: RefObject<HTMLFormElement>; // Accept formRef as a prop
}

export default function UpdateQuantity({
  streakId,
  totalQuantity,
  unit,
  formRef,
  streakCount,
}: UpdateCountProps) {
  const router = useRouter();
  // create a ref for the addedCount input to be cleared on render
  const addedQuantityRef = useRef<HTMLInputElement | null>(null);
  const [total, setTotal] = useState(totalQuantity);
  const [showBanner, setShowBanner] = useState(false);

  // Clear addedCount on render or when total updates
  useEffect(() => {
    if (addedQuantityRef.current) {
      addedQuantityRef.current.value = ''; // Clear the input
    }
  }, [total]); // Clear whenever total changes

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addedCount = Number(formData.get('addedCount') || 0);

    formData.set('totalCount', String(total + addedCount));

    const { totalCount: newTotalCount, streakCount: updatedStreakCount } =
      await UpdateNewQuantity(formData);

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
            <h3 className='text-center text-xl'>Updated amount of {unit}</h3>
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
      <form ref={formRef} onSubmit={update}>
        {/*stores the id of the streak being updated*/}
        <div className='flex flex-col items-center justify-center'>
          <input type='hidden' name='id' value={streakId} />
          <input type='hidden' name='totalCount' value={totalQuantity} />
          <input type='hidden' name='unit' value={unit} />
          <div className='flex w-full flex-col pb-4'>
            <h3 className='text-center font-title text-xl'>Total</h3>
            <div className='flex w-full flex-row items-center justify-center gap-1'>
              <h4 className='text-center text-xl'>{`${total}`}</h4>
              <h4 className='text-center text-xl'>{`${unit}`}</h4>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <label className='mb-2 font-semibold' htmlFor='addedCount'>
              Enter today&apos;s amount of {unit}
            </label>
            <input
              type='number'
              name='addedCount'
              id='addedCount'
              min={0}
              className='rounded-lg border border-purple-700 bg-slate-300 p-2 text-black shadow-sm placeholder:text-purple-400 focus:outline-none focus:ring focus:ring-purple-500'
              ref={addedQuantityRef}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
