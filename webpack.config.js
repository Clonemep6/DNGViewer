const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'viewer.js',
    path:     path.resolve(__dirname, 'js'),
    library:  { type: 'window' }
  }
};
