'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Link } from '../i18n/routing';
import { FaRegMoon } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import LocaleSwitcher from './LocaleSwitcher';
import { BiPhone } from 'react-icons/bi';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-max bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center"
        >
          <Link href="/">
            <Image
              className="mt-3"
              src="/assets/logos/yilmazlar-grup-logo.png"
              alt="Yilmazlar Grup Logo"
              loading="lazy"
              width={150}
              height={33}
            />
          </Link>
        </motion.div>

        <ul className="hidden md:flex ml-10 space-x-4">
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-xl font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-600 dark:text-white dark:hover:text-red-600 dark:font-bold'
                : 'text-white hover:text-red-600'
                }`}
              href="/"
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-xl font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-600 dark:text-white dark:hover:text-red-600 dark:font-bold'
                : 'text-white hover:text-red-600'
                }`}
              href="/about"
            >
              {t('about')}
            </Link>
          </li>
          <li className="relative group">
            <Link
              className={`px-3  rounded-md text-xl font-medium transition-colors inline-flex items-center ${isScrolled
                ? 'text-red-500 hover:text-red-600 dark:text-white dark:hover:text-red-600 dark:font-bold'
                : 'text-white hover:text-red-600'
                }`}
              href="/products"
            >
              {t('products')}
              <svg
                className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180 mt-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <ul className="absolute py-4 px-2 left-0 mt-2 min-w-[300px] bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">

              <li>
                <Link
                  href="/products/winsa"
                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none text-gray-900 dark:text-white mb-1  text-red-600 font-bold">{t('winsa')}</div>
                  <p className="text-sm text-muted-foreground">
                    {t('winsaDesc')}
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/products/linea-rossa"
                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none text-gray-900 dark:text-white mb-1  text-red-600 font-bold">{t('lineaRossa')}</div>
                  <p className="text-sm text-muted-foreground ">
                    {t('lineaRossaDesc')}
                  </p>

                </Link>
              </li>
              <li>
                <Link
                  href="/products/albert-genau"
                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none text-gray-900 dark:text-white mb-1  text-red-600 font-bold"> {t('albertGenau')}</div>
                  <p className="text-sm text-muted-foreground">
                    {t('albertGenauDesc')}
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-xl font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-600 dark:text-white dark:hover:text-red-600 dark:font-bold'
                : 'text-white hover:text-red-600'
                }`}
              href="/services"
            >
              {t('services')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-xl font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-600 dark:text-white dark:hover:text-red-600 dark:font-bold'
                : 'text-white hover:text-red-600'
                }`}
              href="/contact"
            >
              {t('contact')}
            </Link>
          </li>

        </ul>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/+905494244249"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors duration-200 hidden md:flex"
          >
            <BiPhone className="mr-2 h-4 w-4" />
            {t('callNow')}
          </a>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-red-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <LocaleSwitcher defaultValue={locale} isScrolled={isScrolled} />
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-4 rounded-md transition-colors ${isScrolled
              ? 'text-gray-700 hover:text-red-700 dark:text-white dark:hover:text-red-600 dark:font-bold'
              : 'text-white hover:text-red-600'
              }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <MdOutlineWbSunny size={25} />
            ) : (
              <FaRegMoon size={25} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 bg-white text-red-500 dark:bg-gray-800 py-4 mt-4">
          <Link
            className="px-3 py-2 rounded-md text-xl font-medium transition-colors"
            href="/"
          >
            {t('home')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-xl font-medium transition-colors"
            href="/about"
          >
            {t('about')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-xl font-medium transition-colors"
            href="/services"
          >
            {t('services')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-xl font-medium transition-colors"
            href="/contact"
          >
            {t('contact')}
          </Link>
          <div className="relative w-full px-3">
            <button
              onClick={toggleProducts}
              className="w-full py-2 rounded-md text-xl font-medium transition-colors flex items-center justify-between"
            >
              {t('products')}
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isProductsOpen && (
              <div className="mt-2 space-y-2 pl-4">
                <Link
                  href="/products/winsa"
                  className="block py-2 text-sm"
                >
                  {t('winsa')}
                </Link>
                <Link
                  href="/products/linea-rossa"
                  className="block py-2 text-sm"
                >
                  {t('lineaRossa')}
                </Link>
                <Link
                  href="/products/albert-genau"
                  className="block py-2 text-sm"
                >
                  {t('albertGenau')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

