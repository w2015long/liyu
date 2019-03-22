//处理POST、GET以及其他请求
var http = require('http');
var  fs = require('fs');
var url = require('url');

var hostname = '127.0.0.1';
var port = 3001;

var server = http.createServer(function(req,res){
	
	var urlStr = req.url;
	var parm = url.parse(urlStr,true).query;
	var json = '{"name":"Tom","major":"computer"}';
	res.end(parm.callback+'('+json+')');
})

server.listen(port,hostname,function(){
	console.log('Server runing at http://'+hostname+':'+port+'/');
})