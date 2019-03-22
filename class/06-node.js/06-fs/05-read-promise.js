const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

readFilePromise('./01.txt',{flag:'r'})
.then(data=>{
	console.log(data.toString());
})
.catch(err=>{
	console.log(err)
})