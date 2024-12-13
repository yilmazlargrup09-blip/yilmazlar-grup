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
      className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-800 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
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
              width={200}
              height={33}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex ml-10 space-x-4">
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                : 'text-white hover:text-red-400'}`}
              href="/"
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                : 'text-white hover:text-red-400'}`}
              href="/about"
            >
              {t('about')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                : 'text-white hover:text-red-400'}`}
              href="/services"
            >
              {t('services')}
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${isScrolled
                ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                : 'text-white hover:text-red-400'}`}
              href="/contact"
            >
              {t('contact')}
            </Link>
          </li>
        </ul>

        {/* Locale Switcher & Theme Toggle */}
        <div className="flex items-center gap-4">
        <li>
            <a 
              href="tel:+905494244249"
              className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors duration-200"
            >
              <Phone className="mr-2 h-4 w-4" />
              {language === 'tr' ? 'Şimdi Ara' : language === 'en' ? 'Call Now' : 'Позвонить'}
            </a>
          </li>
          {/* Locale Switcher */}
          <div className="relative">
            <LocaleSwitcher defaultValue={locale}/>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-4 rounded-md transition-colors ${isScrolled
              ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
              : 'text-white hover:text-red-400'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaRegMoon size={20} /> : <MdOutlineWbSunny size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
