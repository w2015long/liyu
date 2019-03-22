const fs = require('fs');
//1打开文件
//fs.open(path, flags[, mode], callback)
fs.open('01.txt','w',(err,fd)=>{
	if(err) throw err;
	//2写入数据
	fs.write(fd,'hello-Tom',err=>{
		if(err) throw err;
		console.log('write is success...');
		//3保存退出
		fs.close(fd,err=>{
			if(err) throw err;
			console.log('close success...')
		});
	})		
	

})




