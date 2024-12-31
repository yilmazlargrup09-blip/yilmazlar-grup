import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <>
     
     <div className="flex-grow flex flex-col justify-center min-h-[750px] items-center text-center dark:bg-gray-800">
          <h1 className="text-9xl font-bold text-red-500">{t('title')}</h1>
          <p className="text-lg text-gray-600 mt-4">{t('description')}</p>
          <Link href="/" passHref>
            <button
              aria-label={t('buttonText')}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-lg transition-all"
            >
              {t('buttonText')}
            </button>
          </Link>
        </div>
    </>
  );
}
