const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: '#eval-source-map',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'app.js'
  },
  devServer: {
    hot: true,
    publicPath: '/js/',
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    stats:{
      children: false,
      maxModules: 0
    }
  }
};