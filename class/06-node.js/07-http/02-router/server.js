const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
  	console.log('res.url=>',req.url)
  	const filePath = req.url;
  	res.setHeader('Content-Type', "text/html; charset=utf-8");	
	res.write('hello 你好')
	res.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});