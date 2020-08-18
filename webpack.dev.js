const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        publicPath: '/js/',
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
        stats: {
            children: false,
            maxModules: 0
        }
    }
});