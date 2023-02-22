const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === 'production'? '/online-shop-frontend/': '/',
  devServer:{
    host:'itdove.myvnc.com',
  }
});
