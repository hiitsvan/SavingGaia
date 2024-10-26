const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, 'frontend/dist'),
  indexPath: path.resolve(__dirname, 'frontend/public/index.html'),
  configureWebpack: {
    entry: path.resolve(__dirname, 'frontend/src/main.js'), // Specify the correct path for main.js
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'frontend/src'),
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'frontend/public'),
    },
    port: 8080,
  },
};
