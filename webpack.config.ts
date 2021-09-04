import fs from 'fs';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export const webpackConfig: webpack.Configuration = {
  entry: resolvePath('./client/index.tsx'),
  devtool: 'inline-source-map',
  stats: 'errors-only',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: require.resolve('ts-loader'),
        include: resolvePath('./client')
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
  plugins: [
    new HtmlWebpackPlugin({
      title: `Locale Resource Editor - ${getProjectName()}`
    })
  ]
};

function resolvePath(pathTail: string) {
  const result = path.resolve(__dirname, pathTail);

  if (fs.existsSync(result)) {
    return result;
  }

  return path.resolve(__dirname, '..', pathTail);
}

function getProjectName(): string {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');

  const content = fs.readFileSync(packageJsonPath, 'utf-8');

  const packageJson = JSON.parse(content) as { name: string };

  return packageJson.name;
}
