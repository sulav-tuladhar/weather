// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
//   transform: {
//     '^.+\\.ts$': 'ts-jest'
//   },
//   transformIgnorePatterns: ['/node_modules/'],
//   testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
// };
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/**/?(*.)+(spec|test).[tj]s?(x)'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};