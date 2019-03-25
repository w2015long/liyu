

const swig = require('swig');

const {	add:addData,getData,remove} = require('../Model/model.js');


class Wish{
	index(req,res,...args){
		getData()
		.then(data=>{//获取后台数据后处理html文件
			let template = swig.compileFile(path.normalize(__dirname + '/static/index.html'));
			let output = template({
				data
			})
			res.setHeader('Content-Type','text/html; charset=utf-8');
			res.end(output);			
		})
		.catch(err=>{
			console.log('get data error:::',err);
			//获取失败后前台 返回提示信息
			res.setHeader('Content-Type','text/html; charset=utf-8');
			res.statusCode = 500;
			res.end('<h1>服务器错误</h1>');
		})		
	}
	add(req,res,...args){
		let body = '';
		req.on('data',chunk=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			addData(obj)//添加数据
			.then(data=>{
				//end()必须接收json作为参数
				let result = JSON.stringify({
					status:0,//代表success
					data:data
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
		remove(id)
		.then(()=>{
			//end()必须接收json作为参数
			let result = JSON.stringify({
				status:0,//代表success
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
	}
}