import path from 'path';

export default {
  entry: ['./app/App.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        // compile our code with babel
        test: /\.js$/,
        loaders: ['babel?stage=0'],
        include: __dirname + '/app'
      },
    ]
  }
};
