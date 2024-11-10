const path = require('path');

module.exports = {
  publicPath: "/",
  // outputDir: path.resolve(__dirname, '/dist'),
  // indexPath: path.resolve(__dirname, '/public/index.html'),
  configureWebpack: {
    entry: path.resolve(__dirname, '/src/main.js'), // Specify the correct path for main.js
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/public'),
    },
    port: 8080,
  },
};
