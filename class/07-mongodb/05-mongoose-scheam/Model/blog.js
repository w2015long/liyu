
//1引入mongoose
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type:String,
		default:''
	},
	content:String,
	author:mongoose.Schema.Types.ObjectId,

});


const blogModel = mongoose.model('blog', blogSchema);
//4.导出模块
module.exports = blogModel;