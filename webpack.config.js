const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: './app.jsx',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'}, // creates style nodes from JS strings
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'}, // translates CSS into CommonJS
                ],
            },
            {
                test: /\.(png|jpg|gif|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50,  //it's important
                            outputPath: 'static',
                        },
                    }],
            },
        ],
    },
    target: 'web',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
        new CopyPlugin({
            patterns: [
                {from: './index.html', to: 'index.html'},
                {from: './favicon.ico', to: 'favicon.ico'},
                {from: './static/item', to: 'static/item'},
                {from: './static/mob_effect', to: 'static/effect'},
                {from: './static/gui', to: 'static/gui'},
            ],
            options: {
                concurrency: 100,
            },
        }),
        //new BundleAnalyzerPlugin(),//use for check bundle size
    ],
};
