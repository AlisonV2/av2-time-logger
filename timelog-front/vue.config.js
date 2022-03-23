module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'WeLOOP - Timelogger';
      return args;
    });
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: './src/assets/styles/global/global.scss'
    },
  }
}
