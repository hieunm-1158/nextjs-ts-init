/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['vi', 'en'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
