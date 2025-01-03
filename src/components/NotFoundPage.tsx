'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from "framer-motion"
import { Button } from './ui/button';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})
export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div
    className={`${poppins.variable} min-h-screen flex flex-col 
      bg-gradient-to-b from-gray-70 to-gray-100 
      dark:from-gray-900 dark:to-gray-800
      bg-[url("/assets/images/not-found-bg.png")] 
      dark:bg-[url("/assets/images/not-found-bg-dark.png")]
      bg-cover bg-center' // Tailwind classes for background settings`}
  >
     <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[150px] md:text-[200px] font-bold text-red-600 leading-none">
            {t('title')}
            </h1>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {t('description')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-lg px-8 text-white"
            >
              <Link href="/">
              {t('buttonText')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
   
    </div>
  );
}
