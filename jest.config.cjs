/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).{js,ts}',
    '<rootDir>/src/**/*.(test|spec).{js,ts}',
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
  resolver: undefined,
  clearMocks: true,
  restoreMocks: true,
  extensionsToTreatAsEsm: [],
  testTimeout: 10000,
  verbose: true,
};
