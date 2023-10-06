import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-react-i18next',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpack: config => {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            babel: true,
            titleProp: true,
          },
        },
        {
          loader: require.resolve('url-loader'),
          options: {
            name: '[name].[hash:8].[ext]',
            limit: 10240,
          },
        },
      ],
    });

    return config;
  },
};
export default config;
