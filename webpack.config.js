const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Dotenv = require('dotenv-webpack');
require("babel-polyfill");

module.exports = {
  entry: {
  		content:["babel-polyfill", "./src/content/app.js"], 
  		background:["babel-polyfill", "./src/background/app.js"],
  		popup:["babel-polyfill", "./src/popup/app.js"]

	},
	devtool: '#inline-source-map',
	mode: 'development',
	node: {
		fs: 'empty'
	},
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
		use: {
	        loader: 'babel-loader',
	        options: {
						presets: ['@babel/preset-env'],
						
					},
					
		}
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',

      },
      {
	      test: /\.(sa|sc|c)ss$/,
	      use: [
				MiniCssExtractPlugin.loader,
	            {
	                loader: 'css-loader',
	                options: {
	                    importLoaders: 2,
	                    sourceMap: true
	                }
	            },
	            {
	                loader: 'postcss-loader',
	                options: {
	                    plugins: () => [
	                        require('autoprefixer')
	                    ],
	                    sourceMap: true
	                }
	            },
	            {
	                loader: 'sass-loader',
	                options: {
	                    sourceMap: true
	                }
	            }
	           ]
    	},
    	{
         test: /\.(png|svg|jpg|jpeg|gif)$/,
         use: {
           loader: 'file-loader',
           options: {
    		name: '[name].[ext]',
    		outputPath: 'images',
  			} 
         },
      },
    ]
  },
  plugins: [

	  new MiniCssExtractPlugin({
	    filename: "css/bundle.css"
	  }),
		new VueLoaderPlugin(),
		new Dotenv(),

	],
resolve: {
    alias: {
       '@': __dirname + '/src'  
    }
  }

};