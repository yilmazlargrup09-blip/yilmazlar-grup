// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
    images: {
        domains: ['localhost'],
      },
};

module.exports = withNextIntl(config);