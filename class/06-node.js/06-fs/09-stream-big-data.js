const fs = require('fs');

const ws = fs.createWriteStream('../../../../download/copy.mp4');

/*---------------------------------*/
//fs.createReadStream(path[, options])
////../../../../download/snow.mp4
const rs = fs.createReadStream('../../../../download/snow.mp4');
/*
rs.on('data',chunk=>{
	console.log('data::',chunk);
})
rs.on('end',()=>{
	console.log(`end  this is body`)
})
*/
rs.pipe(ws);
