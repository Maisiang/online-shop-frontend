const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    //host:'127.0.0.1',
    host:'114.47.240.147',
    proxy:{
      '/api':{
        target: "http://localhost:3000", // Node Express API的 URL
        changeOrigin: true, // 是否為跨域請求
        ws:true,
        secure:false,
        pathRewrite: {'^/api': '/api'},
      }
    }
  }
});
