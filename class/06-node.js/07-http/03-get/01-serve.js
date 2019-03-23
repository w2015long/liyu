
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
  	// res.statusCode = 200;
  	/*
  //url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
  	const objUrl = url.parse(req.url);
  	console.log("objUrl=>",objUrl);
  	const queryStr = objUrl.query;
  	console.log("objUrl.query=>",queryStr);
//querystring.parse(str[, sep[, eq[, options]]])
	const queryObj = querystring.parse(queryStr);
	console.log('queryObj',queryObj);
	*/
	const objUrl = url.parse(req.url,true);
	console.log('objUrl=>',objUrl);
	console.log('objUrl.query=>',objUrl.query)
  	res.setHeader('Content-Type','text/html; charset=utf-8');	
	res.end('index is skip');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
