module.exports = {
  publicPath: '.',
  devServer: {
    proxy: {
      [process.env.VUE_APP_API_BASE_URL]: {
        target: process.env.VUE_APP_API_HOST,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_BASE_URL}`]: '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/global/index.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((options) => {
      options[0].title = process.env.VUE_APP_TITLE;
      return options;
    });
  },
};
