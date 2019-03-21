const fs = require('fs');
//1打开文件

fs.openSync('02.txt','r');
//2读取数据
//fs.readSync(fd, buffer, offset, length, position)
const buf = Buffer.alloc(10);
fs.readSync(fd,buf,0,10)
//3保存退出