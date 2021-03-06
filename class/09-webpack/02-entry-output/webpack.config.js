

const path = require('path');

module.exports = {
	//指定打包环境
	mode:'development',
	//入口(单入口写法)
	// entry:{main:'.src/index.js'}简写entry: './src/index.js',
	
	entry: {//多入口写法
	  //chunk名称:入口文件路径
	  common: "./src/page/common/index.js",
	  index: "./src/page/index/index.js",
	},	
	
	//出口
	output: {
		//出口文件名(多个入口文件时，要加模板文件名)
		//[name] chunk名称
		//chunk内容的hash,每一个chunkhash值都不同
		//[hash] 模块标识符的hash,每一次打包的模块hash值都不同
		filename: '[name].[chunkhash].bundle.js',
		//出口文件路径
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