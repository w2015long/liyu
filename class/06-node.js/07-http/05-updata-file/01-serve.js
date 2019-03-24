const http = require('http');
const querystring = require('querystring');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
  	//console.log(`req.url=>${req.url}\nreq.method=>${req.method}`);
    let form = new formidable.IncomingForm();
    form.uploadDir = "./upload/";
    form.keepExtensions  = true;
    form.parse(req, function(err, fields, files) {
        
        console.log({fields: fields, files: files});
        //1获取扩展名
        let extname = path.extname(files.avatar.File.name);

        //2.拼接新文件路径


        //更改上传文件名fs.rename(oldPath, newPath, callback)
        fs.rename(,,err=>{
          if(err) throw err;
          console.log('rename success');
        })
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end('end')        

    });

  	
    /*	
  	let body = '';
  	req.on('data',chunk=>{
  		body += chunk;
  	})
  	req.on('end',()=>{
  		console.log('data::',body)
      const obj = querystring.parse(body);
      console.log(obj)
  	})
    */

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
