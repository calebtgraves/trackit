import Image from 'next/image';
type prop = {
  src: string;
  color: string;
  backgroundColor: string;
  text: string;
};
export default function CreateBanner({
  src,
  color,
  backgroundColor,
  text,
}: prop) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-b-xl ${backgroundColor} ${color} py-5`}
    >
      <div className='my-5 flex w-full flex-row items-center justify-center'>
        <div className='mx-auto flex w-full flex-col items-center justify-center sm:flex-col md:flex-row lg:flex-row'>
          <h1 className='text-shadow-1 text-shadow-2 text-center font-title text-3xl text-black md:text-4xl lg:text-5xl'>
            {text}
          </h1>
          <div className='ml-0 mt-2 rounded-full border-4 border-black sm:ml-0 sm:mt-2 md:ml-2 md:mt-0 lg:ml-2 lg:mt-0'>
            <Image src={src} width={50} height={50} alt='logo' />
          </div>
        </div>
      </div>
    </div>
  );
}
