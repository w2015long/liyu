const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
	//req=request 可读流
	//res=response 可写流
  	console.log('res.url=>',req.url);
  	const filePath = req.url;
  	switch(filePath){
  		case '/index.html':
	  		fs.readFile('./index.html',(err,data)=>{
	  			if(err) throw err;
	  			res.setHeader('Content-Type', "text/html; charset=utf-8");	
	  			res.end(data);
  			}) 
  			break;
  		case '/css/index.css':	
	  		fs.readFile('./css/index.css',(err,data)=>{
	  			if(err) throw err;
	  			res.setHeader('Content-Type', "text/css; charset=utf-8");	
	  			res.end(data);
  			})
  			break;  
  		case '/js/index.js':	
	  		fs.readFile('./js/index.js',(err,data)=>{
	  			if(err) throw err;
	  			res.setHeader('Content-Type', "application/x-javascript; charset=utf-8");	
	  			res.end(data);
  			})
  			break; 
  		case '/images/first.jpg':	
	  		fs.readFile('./images/first.jpg',(err,data)=>{
	  			if(err) throw err;
	  			res.setHeader('Content-Type', "image/jpeg; charset=utf-8");	
	  			res.end(data);
  			})
  			break; 
  		default:
  			res.setHeader('Content-Type', "text/html; charset=utf-8");
  			res.statusCode = 404;
  			res.end('<h1>页面找不到</h1>');
  			break;	 			  			  				
  	}

  	
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});