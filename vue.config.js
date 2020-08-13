module.exports = {
  devServer: {
    port: "8081",
    https: false,
    hotOnly: false
    /*proxy: {
      "/api": {
        target: "http://localhost:8080", //API服务器的地址
        changeOrigin: true, // 虚拟的站点需要更管origin
        ws: true,
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/api": ""
        }
      }
    }*/
  }
};
