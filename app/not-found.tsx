import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='flex flex-col h-full items-center mt-16 space-y-4'>
      <Image src={'/logo.svg'} alt={''} width={80} height={80} />
      <h1 className='font-extrabold text-5xl tracking-tight'>404</h1>
      <span className='text-gray-600 dark:text-gray-400'>
        Page Not Found. Go Back to{' '}
        <Link
          href='/'
          className='underline hover:text-black dark:hover:text-white underline-offset-[3px]'
        >
          Home
        </Link>{' '}
        page.
      </span>
    </section>
  );
}
