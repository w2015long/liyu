const http = require('http');
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
  	//console.log(`req.url=>${req.url}\nreq.method=>${req.method}`);

  	res.setHeader('Content-Type','text/html; charset=utf-8');	
  	let body = '';
  	req.on('data',chunk=>{
  		body += chunk;
  	})
  	req.on('end',()=>{
  		console.log('data::',body)
      const obj = querystring.parse(body);
      console.log(obj)
  	})
    res.end('end')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
