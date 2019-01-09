//处理POST、GET以及其他请求
var http = require('http');
var  fs = require('fs');
var url = require('url');

var hostname = '127.0.0.1';
var port = 3001;

var server = http.createServer(function(req,res){
	// res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000');
	res.setHeader('Access-Control-Allow-Origin','*');//*代表允许所有的源 在此地址端口请求
	res.setHeader('Content-type','text/html');
	var urlStr = req.url;
	console.log(urlStr);
	if(urlStr == '/favicon.ico'){
		res.end('/favicon.ico');
	}
	//请求路径带参数?
	if(urlStr.search(/\?/) != -1){
		var parm = url.parse(urlStr,true).query;
		//根据前台数据做处理
		var json = JSON.stringify(parm);
		res.end(json);
	}	

	if(req.method == "GET"){

		var filePath = './' + urlStr;
		fs.readFile(filePath,function(err,data){
			if(!err){//根据前台数据做处理
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