const TransformPaths = require('tsconfig-paths-jest');

const TypescriptConfig = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: TransformPaths(TypescriptConfig),
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: ['__tests__/.*/*\\.test.ts$', '__e2e__/.*/*\\.test.ts$'],
};
