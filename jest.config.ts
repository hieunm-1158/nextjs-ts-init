import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  setupFiles: ['<rootDir>/src/setEnvVars.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/organisms/**/*.{ts,tsx,js,jsx}',
    'src/templates/**/*.{ts,tsx,js,jsx}',
    'src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svg.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
