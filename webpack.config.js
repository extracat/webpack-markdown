const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const markdownKatexLoader = require.resolve('./markdown-katex-loader.js')


// Override function
const tokenizer = {
  codespan(src) {
    const match = src.match(/^\$+([^\$\n]+?)\$+/);
    if (match) {
      return {
        type: 'codespan',
        raw: match[0],
        text: match[1].trim()
      };
    }

    // return false to use original codespan tokenizer
    return false;
  }
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

  module: {
    rules: [

      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: markdownKatexLoader,
            options: {
              // Pass options to marked
              // See https://marked.js.org/using_advanced#options
              gfm: true,
              smartypants: true,
              silent: true
            },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
/*
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
*/
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: 'My App',
      meta: {
        viewport: 'width=device-width, initial-scale=1,shrink-to-fit=no'
      },
      template: 'src/template.html'
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};