import '@testing-library/jest-dom';
import { createContext } from 'react';

// eslint-disable-next-line no-console
console.warn = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// Refer: https://github.com/vercel/next.js/issues/43769#issuecomment-1371647893
jest.mock('next/dist/shared/lib/router-context.shared-runtime', () => ({
  RouterContext: createContext(true),
}));
