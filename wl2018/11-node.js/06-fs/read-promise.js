const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.resdFile);

resdFile('./01.txt')
.then(data=>{
	console.log(data);
})