
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
		required:[true,'用户名必须输入'],
		maxlength:[5,'用户名最多五位'],
		minlength:[2,'用户名至少两位']
	},
	age:{
		type:Number,
		required:[true,'年龄必须输入'],
		max:[150,'不好，已经超出范围'],
		min:[10,'用户不满10周岁']
	},
	phone:{
		type:Number,
		validate:{
			validator:function(num){
				return /^1[356789]\d{9}$/.test(num);
			},
			message:'{VALUE}此手机号不合法'
		}
		
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