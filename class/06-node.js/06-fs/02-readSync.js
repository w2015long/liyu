const fs = require('fs');


/*
//1打开文件
const fd = fs.openSync('02.txt','r');
//2读取数据

//fs.readSync(fd, buffer, offset, length, position)
//从 fd 指定的文件中读取数据。
//buffer 是数据将写入的缓冲区。
//offset 是 buffer 中开始写入的偏移量。
//length 是一个整数，指定要读取的字节数。
//position 参数指定从文件中开始读取的位置。 如果 position 为 null，则从当前文件位置读取数据，
//并更新文件位置。 如果 position 是整数，则文件位置将保持不变。

const buf = Buffer.alloc(20);
console.log('1::',buf);
fs.readSync(fd,buf,0,20,0);
console.log('2::',buf)
console.log('3::',buf.toString())

//3退出
fs.closeSync(fd);
*/

//fs.readFile(path[, options], callback)
fs.readFile('02.txt',{flag:'r'},(err,data)=>{
	if(err) throw err;
	console.log(data)
})