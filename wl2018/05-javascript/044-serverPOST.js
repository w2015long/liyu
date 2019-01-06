//处理POST请求
var http = require('http');
var  fs = require('fs');
var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req,res){
	var urlStr = req.url;
	console.log(req.method);
	if(urlStr == '/favicon.ico'){
		res.end('/favicon.ico');
	}
	if(req.method == "GET"){
		var filePath = './' + urlStr;
		fs.readFile(filePath,function(err,data){
			if(!err){
				res.end(data);
			}else{
				res.statusCode = 404;
				res.end('not found....');
			}
		})		
	}else if(req.method == "POST"){
		var body = '';
		req.on('data',function(chunk){//接受POST请求发送的数据
			body += chunk;
		})
		req.on('end',function(){//监听end方法
			console.log('got post data::',body);
			res.end(body);
		})
	}else{//其他非 GET、POST请求
		res.end('request is ok');
	}

})

server.listen(port,hostname,function(){
	console.log('Server runing at http://'+hostname+':'+port+'/');
})