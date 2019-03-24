const http = require('http');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');



const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
  	//console.log(`req.url=>${req.url}\nreq.method=>${req.method}`);
    if(req.method.toLowerCase()=='post'){
        let form = new formidable.IncomingForm();
        form.uploadDir = "./upload";
        form.keepExtensions  = true;
        form.parse(req, function(err, fields, files) {
            
            //console.log({fields, files});
            //console.log(files.avatar.path);
            let oldPath =  __dirname +'/'+ files.avatar.path;
            //console.log(  'oldPath',oldPath ) ; 
            //1获取扩展名
            let extname = path.extname(oldPath);

            //2.拼接新文件路径
            let newPath = __dirname + '/upload/'+Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0')+extname;
            console.log(newPath)
            //更改上传文件名fs.rename(oldPath, newPath, callback)
          
            fs.rename(oldPath,newPath,err=>{
              if(err) throw err;
              console.log('rename success');
              res.setHeader('Content-Type','text/html; charset=utf-8');
              res.end('submit success') 
            })
       
          // res.end('submit success')
        });
    }  
  	

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/*
{ avatar:
      File {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        size: 4550852,
        path: 'upload\\upload_ee7e09fd5f9841a7ca6304465efa2d74.jpg',
        name: '5.jpg',
        type: 'image/jpeg',
        hash: null,
        lastModifiedDate: null,
        _writeStream: [WriteStream] 
      } 
}
*/ 
