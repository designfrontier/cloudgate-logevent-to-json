// @flow
module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'src/utils/testHelpers.js',
    'bin/smoke-tests/testHelpers.js'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 95
    }
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['bin/smoke-tests']
};
