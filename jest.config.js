/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
};
