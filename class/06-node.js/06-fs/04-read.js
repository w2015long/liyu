const fs = require('fs');
//1打开文件
//fs.open(path, flags[, mode], callback)
/*
fs.read(fd, buffer, offset, length, position, callback)
*/
/*
fs.open('01.txt','r',(err,fd)=>{
	if(err) throw err;
	//2读取数据
	const buf = Buffer.alloc(20);

	fs.read(fd,buf,0,20,0,err=>{
		if(err) throw err;
		console.log('success-data',buf.toString());
		//3退出
		fs.close(fd,err=>{
			if(err) throw err;
			console.log('close success')
		})

	})
})
*/
//fs.readFile(path[, options], callback)
fs.readFile('01.txt',{flag:'r'},(err,data)=>{
	if(err) throw err;
	console.log('readFile::',data.toString());
})
console.log('do something..')


