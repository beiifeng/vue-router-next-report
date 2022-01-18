const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const deployPath = process.env.QIANKUN_ENV !== 'micro' ? '/' : `/${name}/`;

module.exports = {
  publicPath: deployPath,
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // 跨域配置
      '/api/': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        pathRewrite(pathUrl) {
          return pathUrl;
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'ant-prefix': 'antdv',
        },
        // 必须保留
        javascriptEnabled: true,
      },
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
