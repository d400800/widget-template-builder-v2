const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const templateFolder = process.env.TEMPLATE_FOLDER;
// const inject = 'body';
const inject = false;

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Widget Template',
            template: 'src/widget.html',
            inject,
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: __dirname + '/src/scss-template-loader.js',
                        options: {templateFolder}
                    },

                ]
            },
            {
                test: /\.html$/,
                loader: path.resolve(__dirname + '/src/widget-template-loader.js')
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: __dirname + '/src/js-template-loader.js',
                        options: {templateFolder}
                    },
                ]
            }
        ],
    },
};
