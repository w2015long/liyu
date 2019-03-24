const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const swig = require('swig');



const mime = require('./mime.json');
const hostname = '127.0.0.1';
const port = 3000;

const {	add,getAll,updataData} = require('./model.js');

const server = http.createServer((req,res)=>{
	// console.log('url',req.url);
	let  reqUrl = url.parse(req.url,true);
	// console.log(reqUrl);
	let pathname = reqUrl.pathname;
	

	if(pathname == '/' || pathname == '/index.html'){//获取首页
		getAll()
		.then(data=>{//获取后台数据后处理html文件
			console.log('+>>>>>',data)
			console.log('=>>>',path.normalize(__dirname + '/static/index.html'))
			let template = swig.compileFile(path.normalize(__dirname + '/static/index.html'));
			let output = template({
				data
			})
			res.setHeader('Content-Type','text/html; charset=utf-8');
			res.end(output);			
		})
		


	}else{//请求静态资源
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



	













  		
})





server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
