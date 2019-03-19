const str = 'hello';

const fn = ()=>{
	console.log('fn....');
}

const obj = {
	user:'Tom',
	age:'18'
}
/*
console.log("module",module);
console.log("exports",exports);
console.log('module.exports',module.exports);
console.log(module.exports===exports);//true
*/
/*
exports.str = str;
exports.fn = fn;
exports.obj = obj;
console.log(exports);
*/
module.exports.str = str;
module.exports.fn = fn;
module.exports.obj = obj;
console.log('m05::',module.exports);