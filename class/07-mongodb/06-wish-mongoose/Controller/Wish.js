
const path = require('path');
const swig = require('swig');
const querystring = require('querystring');


const wishModel = require('../Model/model.js');

function getRandom(min,max){
	return Math.round(min + (max-min)*Math.random());
}
const colorArr = ['blue','green','purple','red','pink','orange','coral','fuchsia','#089','#9ad'];

class Wish{
	index(req,res,...args){
		wishModel.find({},(err,data)=>{
			if(err){
				console.log('get data error:::',err);
				//获取失败后前台 返回提示信息
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.statusCode = 500;
				res.end('<h1>服务器错误</h1>');
			}else{
				let template = swig.compileFile(path.normalize(__dirname + '/../View/Wish/index.html'));
				let output = template({
					data
				})
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.end(output);				
			}
		})			

	}
	add(req,res,...args){
		let body = '';
		req.on('data',chunk=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			obj.color = colorArr[getRandom(0,colorArr.length-1)];

			wishModel.insertMany(obj)
			.then(data=>{
				//end()必须接收json作为参数
				let result = JSON.stringify({
					status:0,//代表success
					data:data[0]
				});
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.end(result);
			})
			.catch(err=>{
				let result = JSON.stringify({
					status:10,//代表fail
					message:'add maybe fail'
				});
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.end(result);
			})			

			
		})		
	}
	del(req,res,...args){
		//console.log(args[0]);
		wishModel.deleteOne({_id:args[0]},err=>{
			if(err){
				let result = JSON.stringify({
					status:10,//代表fail
					message:'deleteOne maybe fail'
				});
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.end(result);
			}else{
				let result = JSON.stringify({
					status:0,//代表success
				});
				res.setHeader('Content-Type','text/html; charset=utf-8');
				res.end(result);				
			}

		})			
	}
}

module.exports = new Wish();