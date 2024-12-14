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
  const locale = useLocale();

  // Scroll event listener to manage navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 py-2 transition-colors duration-700 ${isScrolled ? 'bg-white/90 dark:bg-gray-800 backdrop-blur-sm shadow-lg ' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
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
              width={150}
              height={33}
            />
          </Link>
        </motion.div>

        {/* Mobile Hamburger Button */}

        {/* Desktop Navigation */}
        <ul className="hidden md:flex ml-10 space-x-4">
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-300 dark:font-bold'
                : 'text-white hover:text-red-400'}`}
              href="/"
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-300 dark:font-bold '
                : 'text-white hover:text-red-400'}`}
              href="/about"
            >
              {t('about')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-300 dark:font-bold'
                : 'text-white hover:text-red-400'}`}
              href="/services"
            >
              {t('services')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-300 dark:font-bold'
                : 'text-white hover:text-red-400'}`}
              href="/contact"
            >
              {t('contact')}
            </Link>
          </li>
        </ul>

        {/* Locale Switcher & Theme Toggle */}
        <div className=" flex items-center gap-4">
          <a
            href="https://wa.me/+905494244249"
            target='_blank'
            className="inline-flex 
            items-center 
            bg-red-600 
            text-white 
            px-4 py-2 
            rounded-full 
            text-sm 
            font-bold 
            hover:bg-red-700 
            transition-colors 
            duration-200 
            hidden md:flex"
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Locale Switcher */}
          <div className="relative">
            <LocaleSwitcher defaultValue={locale} isScrolled={isScrolled} />
          </div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-4 rounded-md transition-colors ${isScrolled
              ? 'text-gray-700 hover:text-red-700 dark:text-white dark:hover:text-red-300 dark:font-bold'
              : 'text-white hover:text-red-600'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <MdOutlineWbSunny size={25} /> : <FaRegMoon size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 bg-white text-red-500 dark:bg-gray-800  py-4 mt-4">
          <Link
            className="px-3 py-2 rounded-md text-md font-medium transition-colors"
            href="/"
          >
            {t('home')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-md font-medium transition-colors"
            href="/about"
          >
            {t('about')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-md font-medium transition-colors"
            href="/services"
          >
            {t('services')}
          </Link>
          <Link
            className="px-3 py-2 rounded-md text-md font-medium transition-colors"
            href="/contact"
          >
            {t('contact')}
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
