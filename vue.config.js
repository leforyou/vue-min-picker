// 'use strict'
//const env = process.env.NODE_ENV; //production / development
// 所有的配置项解释都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
    publicPath: './', // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    outputDir: 'dist', // 输出文件目录
    assetsDir: 'static',
    lintOnSave: true, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false,
    lintOnSave: false, // 关闭eslint
    devServer: {
        port: 8080, // 访问端口
        open: true,
        hot: true, // 开启热加载
        host: '0.0.0.0', //真机测试，使用这个IP
        overlay: {
            warnings: false,
            errors: true
        },
        // 配置跨域代理
        proxy: {
            // 配置跨域
            '/wxOfficialAccount': {
                target: 'http://192.168.125.19:88',
                changeOrigin: true, //开启代理
                ws: true,
                pathRewrite: {
                    '^/wxOfficialAccount': '/wxOfficialAccount'
                }
            },
        },
    },
    configureWebpack: (config) => {

    },
    chainWebpack(config) {
        const path = require("path");
        let resolve = (dir) => path.join(__dirname, dir);
        config.resolve.alias
            .set("@", resolve("src"))
            .set("img", resolve("src/img"))
            .set("js", resolve("src/js"))
            .set("scss", resolve("src/scss"))
            .set("views", resolve("src/views"))
            .set("components", resolve("src/components"));
    }
}