import fs from 'fs';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export const webpackConfig: webpack.Configuration = {
  entry: findEntry(),
  devtool: 'inline-source-map',
  stats: 'errors-only',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: require.resolve('ts-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'].map((l) =>
          require.resolve(l)
        )
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [new HtmlWebpackPlugin()]
};

function findEntry() {
  const pathTail = './client/index.tsx';
  const result = path.resolve(__dirname, pathTail);

  if (fs.existsSync(result)) {
    return result;
  }

  return path.resolve(path.resolve(__dirname, '../'), pathTail);
}
