
//1引入mongoose
const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
	content: {
		type:String,
	},
	color:{
		type:String,
	}	
});


const wishModel = mongoose.model('wish', wishSchema);
//4.导出模块
module.exports = wishModel;