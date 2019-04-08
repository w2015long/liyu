

const path = require('path');

module.exports = {
	//指定打包环境
	mode:'development',
	//入口
	entry: './src/index.js',
	//出口
	output: {
		filename: 'bundler.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
				  'style-loader',
				  'css-loader'
				]
			},

		    //处理图片 
			{
				test: /\.(png|jpg|gif|jpeg)$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			    			//当图片大小超过limit值后,会生成一个文件
			    			//默认使用file-loader处理图片文件,所以需要额外安装file-loader
			      			limit: 10000
			    		}
			  		}
				]
			}		  
		],
		
	}
};