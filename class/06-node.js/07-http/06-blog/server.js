const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req,res)=>{
	console.log('url',req.url);
	let  reqUrl = url.parse(req.url);
	console.log(reqUrl);
	let pathname = reqUrl.pathname;
	//约定：如果请求根目录 返回根目录下的index.html
	if(pathname.lastIndexOf('.')==-1){
		pathname = pathname + '/index.html';
	}
	//规范文件路径//path.normalize(path)
	let filePath = path.normalize(__dirname + '/static'+pathname);

	console.log('filePath',filePath);
	fs.readFile(filePath,(err,data)=>{
		
	})
	













  	res.setHeader('Content-Type','text/html; charset=utf-8');	
	res.end('end');
})





server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
