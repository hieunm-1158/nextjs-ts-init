/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // just a demo, I will update it later
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
