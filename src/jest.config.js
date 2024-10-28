module.exports = {
    testEnvironment: 'jsdom', // Gunakan jsdom karena kita menguji komponen React
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // File setup
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Untuk menangani import CSS
    },
  };
  