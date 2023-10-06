/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEE5F5',
          100: '#D3BEE7',
          200: '#B793D8',
          500: '#8642BD',
          600: '#6711AC',
        },
        neutral: {
          50: '#F4F5F8',
          100: '#ECECEC',
          200: '#E0E0E0',
          300: '#D1D1D1',
          400: '#AFAFAF',
          500: '#828282',
          600: '#565656',
          700: '#474747',
          800: '#373737',
          900: '#242424',
        },
        success: {
          100: '#D6F3EA',
          500: '#00875A',
        },
        warning: {
          100: '#F7EDDB',
          500: '#E08700',
        },
        error: {
          100: '#FFE6E6',
          500: '#D23131',
        },
        link: {
          100: '#E3EEFF',
          500: '#236BDF',
        },
      },
      fontSize: {
        10: ['0.625rem', '0.875rem'],
        12: ['0.75rem', '1rem'],
        14: ['0.875rem', '1.25rem'],
        16: ['1rem', '1.5rem'],
        18: ['1.125rem', '1.75rem'],
        20: ['1.25rem', '1.75rem'],
        24: ['1.5rem', '2rem'],
        32: ['2rem', '2.25rem'],
      },
      fontFamily: {
        customize: ['Inter', 'Noto Sans JP', ...fontFamily.sans],
      },
      boxShadow: {
        sm: '0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.08)',
        lg: '0px 24px 40px -4px rgba(0, 0, 0, 0.08), 0px 6px 16px -2px rgba(0, 0, 0, 0.04)',
        'elevation-light-1':
          '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-light-2':
          '1px 2px 10px 2px rgba(0, 0, 0, 0.1), 2px 24px 32px -4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
