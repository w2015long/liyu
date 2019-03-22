const fs = require('fs');

const ws = fs.createWriteStream('./ws.txt');


/*---------------------------------*/
//fs.createReadStream(path[, options])
const rs = fs.createReadStream('./rs.txt');

//readable.pipe(writable);writable是数据写入的目标。
rs.pipe(ws);
