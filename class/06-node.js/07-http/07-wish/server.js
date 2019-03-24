const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const swig = require('swig');
const mime = require('./mime.json');

//console.log(mime)
const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req,res)=>{
	console.log('url',req.url);
	let  reqUrl = url.parse(req.url,true);
	console.log(reqUrl);
	let pathname = reqUrl.pathname;
	if(pathname == '/' || pathname == '/index.html'){//获取首页



	}else{
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
