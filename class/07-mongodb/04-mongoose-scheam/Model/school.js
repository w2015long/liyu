
//1引入mongoose
const mongoose = require('mongoose');

//2.定义Scheam
/*
const userSchema = new mongoose.Schema({
	name: String,
	age:Number,
	major:String
}); 
*/
const userSchema = new mongoose.Schema({
	name: {
		type:String,
		default:''
	},
	age:{
		type:Number,
		default:0
	},
	major:{
		type:String,
		enumerable:['Math','Computer','Sport','Art','Chemstry','Music','English'],
		default:'Art'
	},
	loginAt:{
		type:Date,
		default:Date.now
	},
	locked:{
		type:Boolean,
		default:false
	},
	friends:{
		type:Array,
		default:[]
	}
});

//3.生成模型model 
//mongoose.model第一个参数表示数据库的集合,mongoose会自动变为复数
//mongoose.model第二个参数指定Scheam 
const userModel = mongoose.model('school', userSchema);
//4.导出模块
module.exports = userModel;