const fs = require('fs');
/*
//1打开文件
//fs.openSync(path, flags[, mode])
const fd = fs.openSync('./01.txt','w')
//2写入数据
//fs.writeSync(fd, string[, position[, encoding]])
fs.writeSync(fd,'hello');
//3保存退出
//fs.closeSync(fd)
fs.closeSync(fd);
*/
//fs.writeFileSync(file, data[, options])
fs.writeFileSync('02.txt','kuazhu',{flags:'w'})