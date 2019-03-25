const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');



const mime = require('./mime.json');
const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req,res)=>{
	// console.log('url',req.url);
	let  reqUrl = url.parse(req.url,true);
	//console.log("reqUrl>>>>>>",reqUrl);
	let pathname = reqUrl.pathname;
	//console.log('pathname>>>>>>',pathname);

	//约定:
	//1.以/static开头的路径认为是请求静态资源
	//2.路由请求的约定:/Controller/action/arg1/arg2....
	//					/Wish/add
	//					/Wish/del/id
	//					/Wish/index.html
	if(pathname.startsWith('/static')){//请求静态资源
		let filePath = path.normalize(__dirname + '/static'+pathname);
		//path.extname(path)
		let extname = path.extname(filePath);		
		fs.readFile(filePath,(err,data)=>{
			if(err){res.end('<h1>出错了</h1>');}
			else{ 
				res.setHeader('Content-Type',mime[extname]+'; charset=utf-8');
				res.end(data);
			}
		})			
	}else{//路由请求
		let paths = pathname.split('/');
		//console.log(paths);
		let controller = paths.find(data=>'Wish') || 'Wish';
		let action = paths.find(data=>'index')||'index';
		let args = paths.slice(3);
		console.log(args);
		//console.log("controller>>>",controller);
		try{
			let mode = require('./Controller/' +　controller);
			mode[action] && mode[action].apply(null,[req,res].concat(args));
		}
		catch{
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end('<h1>服务器出错了</h1>')
		}
	}





/*
	if(pathname == '/' || pathname == '/index.html'){//获取首页
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
		

	}else if(pathname == '/add' && req.method.toLowerCase()=='post'){
		let body = '';
		req.on('data',chunk=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			add(obj)//添加数据
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
	else if(pathname=='/del'){
		let id = reqUrl.query.id;
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

	else{//请求静态资源
		//规范文件路径//path.normalize(path)
		let filePath = path.normalize(__dirname + '/static'+pathname);
		//path.extname(path)
		let extname = path.extname(filePath);		
		fs.readFile(filePath,(err,data)=>{
			if(err){res.end('<h1>出错了</h1>');}
			else{ 
				res.setHeader('Content-Type',mime[extname]+'; charset=utf-8');
				res.end(data);
			}
		})		
	}

*/

	













  		
})





server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
