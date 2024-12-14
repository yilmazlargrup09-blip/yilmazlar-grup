import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return ( 
    <div className="flex h-screen w-screen pt-5 dark:bg-gray-800">
    <div className="flex flex-col justify-center items-center w-full  p-8 ">
      <h1 className="text-9xl font-bold text-red-500 mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
      {t('description')}
      </p>
      <Link href="/" passHref>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-lg transition-all">
        {t('buttonText')}
        </button>
      </Link>
    </div>
  </div>
  );
}