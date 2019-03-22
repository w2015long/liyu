
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

async function callReadFile(){
	let data = await readFilePromise('01.txt');
	return data;
}
callReadFile()
.then(data=>{
	console.log('async-data',data.toString());
})
.catch(err=>{
	console.log(err)
});
console.log('do something')