// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en', 'tr', 'ru'],  // Desteklediğiniz diller burada
    defaultLocale: 'tr',          // Varsayılan dil Türkçe
  },
};

module.exports = withNextIntl(config);
