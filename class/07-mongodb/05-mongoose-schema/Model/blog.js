
//1引入mongoose
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type:String,
		default:''
	},
	content:String,
	author:{type:mongoose.Schema.Types.ObjectId,ref:'school'}

});


blogSchema.statics.findBlog = function(query){
	return this.findOne(query)
	.populate('author','name age phone -_id');
}

const blogModel = mongoose.model('blog', blogSchema);
//4.导出模块
module.exports = blogModel;