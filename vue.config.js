const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    devServer: {
        disableHostCheck: true,
        open: true,
        host: '192.168.1.7',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:3000/',//后台接口
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }

        }
    },
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    }
}
