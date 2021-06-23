
module.exports = {
    lintOnSave: false,
    devServer: {
      proxy: {
        '/test': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
        '/qqqqqqqqqq': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }