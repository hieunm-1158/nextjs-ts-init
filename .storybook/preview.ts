import type { Preview } from '@storybook/react';
import i18n from './i18n';
import '@/styles/globals.css';

const preview: Preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'English 🇺🇸',
      vi: 'Vietnamese 🇻🇳',
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
  },
};

export default preview;
