var options = require('./webpack.base.js');
options.entry = './src';
options.output = {
  library: 'VueFswipe',
  libraryTarget: 'umd',
  filename: 'vue-fswipe.js',
  path: './dist'
};
options.externals = {
  vue: 'Vue'
};
module.exports = options;
