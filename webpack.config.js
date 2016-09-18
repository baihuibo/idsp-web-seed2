const webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: { // 指定入口文件
        index: './src/index_bootstrap.ts',
        login: './src/login_bootstrap.ts'
    },
    output: { // 指定输出目录和编译后文件名
        path: './bundle',
        filename: '[name].bundle.js'
    },

    externals: { // 外部模块,不会加入到打包程序中,用来提升灵活性修改
        jquery: 'jQuery',
        angular: 'angular',
        config: '__CONFIG__'// 配置文件
    },

    resolve: {// 扫描文件
        extensions: ['.ts', '.js', '.less', '.css', '.html', '.json', '']
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        // 提取公共文件到 common.bundle.*
        new CommonsChunkPlugin('common.bundle.js'),

        // 提取css文件到 *.bundle.css
        new ExtractTextPlugin('[name].bundle.css'),

        //压缩js代码,产品上线时开启编译一次即可,因为此插件时耗时太多
        //new UglifyJsPlugin({compress: {warnings: false}})
    ],
    // devtool: 'source-map', // 开启调试模式
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ng-annotate!ts-loader'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer!less-loader")},
            {test: /\.html/, loader: 'html-loader'},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=[path][name].[ext]'}
        ]
    }
};