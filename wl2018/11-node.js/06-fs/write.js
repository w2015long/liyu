const fs = require('fs');

fs.writeFile('./01.txt','writeFile',err=>{
	if(err) throw err;
	console.log('writeFile success')
})