const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',

    output:{
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js'  
    },
    
    plugins: [
        new HTMLWebpackPlugin({
          template:'./src/index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
    },

    module:{
        rules:[
            {
                test: /.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets : ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
              },
        ]
    }

}