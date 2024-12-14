import { ReactNode } from 'react';
import Image from 'next/image';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  image: string
};

export default function PageLayout({ children, title, image }: Props) {

  return (
    <div className="min-h-screen bg-white dark:bg-[#363f4b]">
      <section className="py-16 relative h-[300px] md:h-[500px] w-full dark:bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt={`Yılmazlar Grup ${title}`}
            fill
            objectFit="cover"
            priority
            className=" brightness-50"
         
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider mb-4">
              {title}
            </h1>
            <div className="w-24 md:w-32 h-1 bg-[#ff0505d9]" />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className='bg-[#f5f7fa] dark:bg-gray-900'>
        <div className="mt-1 ">
          {children}
        </div>
      </section>
    </div>
  );
}
