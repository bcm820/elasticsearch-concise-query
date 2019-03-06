module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverageFrom: ['lib/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupFilesAfterEnv: ['./rtl.config.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
};
