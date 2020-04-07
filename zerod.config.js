const path = require('path');
function resolve(dir) {
    return path.join(__dirname, './', dir);
}
const config = {
    //追加合并webpack配置
    webpackMerger: {
        //入口
        entry: { app: [resolve('src/main.js')] },
        //追加加载器
        module: { rules: [] },
    },
    platform: 'pc', //"pc" 对应 zerod-admin-webpack 模板,"mobile" 对应 zerod-mobile-webpack 模板
    //是否添加 pace.js(页面顶部进度条)
    pace: true,
    //是否antd的图标按需引入,在src/ant-icons.js
    'ant-icons': true,
    //根目录的哪个目录copy到node_modules,copy到node_modules的包名称是 copyFolderName/package.json的name，由npm run copy触发
    copyFolderName: 'share-code',
    //babel-loader 要包含的文件夹是哪些默认包含src,false则不使用babel-loader
    'babel-includes': [],
    //浏览器标签页小图标
    favicon: resolve('src/assets/images/logo.png'),
    //scss变量提升文件,并且scss变量覆盖less变量
    scssVars: [resolve('node_modules/zerod/ant-theme-vars.scss')],
    //追加sass-loader的rule,false则不使用sass-loader
    scssRule: {},
    //追加less-loader的rule,false则不使用less-loader
    lessRule: {},
    //将package.json的dependencies的依赖包预打包,npm run dll||dll-dev||dll-prod 触发
    dll: {
        //是否禁用dll
        disabled: false,
        //除了package.json的dependencies，还需包含
        include: [],
        //打包dll时从package.json的dependencies中不包含
        exclude: ['react-redux', 'redux'],
    },
    //html-webpack-plugin插件的追加配置 [] || (config,NODE_ENV)=>([])
    HtmlIncludeAssets: [],
    //copy-webpack-plugin插件的追加配置 [] || (config,NODE_ENV)=>([])
    CopyWebpackOptions: [],
    //html-webpack-tags-plugin插件的追加配置 [] || (config,NODE_ENV)=>([])
    HtmlIncludeAssets: [],
    //开发模式配置
    dev: {
        // 不进行编译的静态文件目录
        assetsSubDirectory: 'static',
        // 前缀路径, npm run dev --basepath=/mypath/的basepath优先级大于此
        assetsPublicPath: '/',
        // devServer的反代理配置
        proxyTable: {},
        host: '0.0.0.0',
        port: 33000,
        //启动服务后是否自动打开浏览器,可以是浏览器文件如 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        autoOpenBrowser: false,
        //出现编译器错误或警告时，在浏览器中显示全屏覆盖
        errorOverlay: true,
        //编译出错在右下角弹出提醒
        notifyOnErrors: true,
        poll: false,
        //是否编译时启用eslint
        useEslint: false,
        //追eslint-loader的rule
        eslintRule: {},
        devtool: 'cheap-module-eval-source-map',
        //css生成 SourceMap
        cssSourceMap: true,
    },
    //生产模式配置
    build: {
        // 根目录的index.html模板打包后的位置
        index: resolve('dist/index.html'),
        // 打包后所有文件的位置
        assetsRoot: resolve('dist'),
        // 不进行编译的静态文件目录
        assetsSubDirectory: 'static',
        // 前缀路径, npm run build --basepath=/mypath/的basepath优先级大于此
        assetsPublicPath: '/',
        // 是否生成 SourceMap
        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: 'source-map',
        // 是否打包压缩zip
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // 打包完成后打开报告, npm run build --report 触发
        bundleAnalyzerReport: process.env.npm_config_report,
    },
    //覆盖webpack配置
    webpackReplacement: {},
};
module.exports = config;
