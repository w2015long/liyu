const fs = require('fs');

const ws = fs.createWriteStream('./ws.txt');
ws.on('open',()=>{
	console.log('write open file')
})
ws.on('close',()=>{
	console.log('write close file');
})
ws.on('finish',()=>{
	console.log('write is finish...')
})

ws.write('create a write stream',()=>{
	console.log('write is ok')
});
ws.end();

/*---------------------------------*/
//fs.createReadStream(path[, options])
const rs = fs.createReadStream('./ws.txt');

rs.on('data',chunk=>{
	console.log(`readData::${chunk.toString()}`);
})
rs.on('open',()=>{
	console.log('read open file')
})
rs.on('close',()=>{
	console.log('read close file');
})
//先end再close
rs.on('end',()=>{
	console.log('read is end...')
})
