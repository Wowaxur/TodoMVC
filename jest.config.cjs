module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',               // для работы JSX/DOM
  roots: ['<rootDir>/src'],               // чтобы искать файлы внутри src
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'       // важно для алиасов @/…
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};