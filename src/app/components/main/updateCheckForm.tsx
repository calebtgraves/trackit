'use client';

import { FormEvent, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { UpdateNewCheck } from '@/actions/check';

interface UpdateCheckProps {
  streakId: string;
  lastChecked: Date;
  streakCount: number;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function UpdateCheck({
  streakId,
  lastChecked,
  formRef,
}: UpdateCheckProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentTime = new Date();
    const lastCheckedTime = new Date(lastChecked);
    const timeDiffHours =
      (currentTime.getTime() - lastCheckedTime.getTime()) / (1000 * 60 * 60);

    // Show banner and disable checkbox if lastChecked is within 24 hours
    if (timeDiffHours < 24) {
      setShowBanner(true);
      setIsDisabled(true);
    } else {
      setShowBanner(false);
      setIsDisabled(false);
    }
  }, [lastChecked]);

  const handleCheckboxChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Only update if the checkbox is not disabled
    if (!isDisabled) {
      const formData = new FormData(e.currentTarget);
      formData.set('id', streakId);
      const result = await UpdateNewCheck(formData); // Call the async update function

      if (result) {
        setShowBanner(true);
        setIsDisabled(true);
        setIsChecked(true);
      }
    }
  };

  return (
    <div className='mb-4 flex flex-col items-center justify-center'>
      {showBanner && (
        <div className='absolute bottom-0 w-full justify-center rounded-xl border-4 border-green-900 bg-green-500 px-4 py-6'>
          <div className='flex flex-row items-center justify-center'>
            <h3 className='text-center text-xl'>Streak Checked Off</h3>
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
      <form ref={formRef} onSubmit={handleCheckboxChange}>
        <input type='hidden' name='id' value={streakId} />
        <label className='flex items-center space-x-3'>
          <input
            type='checkbox'
            ref={checkboxRef}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            disabled={isDisabled}
            className='size-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed'
          />
        </label>
      </form>
    </div>
  );
}
