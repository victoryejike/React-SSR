const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
        { 
            test: /\.(js)$/, 
            loaders: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

const serverConfig = {
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
            __isBrowser__: "false"
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

module.exports = [browserConfig, serverConfig];