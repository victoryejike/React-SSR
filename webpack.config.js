const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
    entry: './src/server.js',
    externals: nodeExternals(),
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:   `'production'`
            }
        })
    ],
    module:{
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}