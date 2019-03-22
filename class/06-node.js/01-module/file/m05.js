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
//exports对象和module.exports对象是同一个对象
console.log(module.exports===exports);//true
*/
/*
exports.str = str;
exports.fn = fn;
exports.obj = obj;
console.log(exports);
exports只能一个属性一个属性的添加
*/
/*
//导出的始终是module.exports指向的对象
module.exports.str = str;
module.exports.fn = fn;
module.exports.obj = obj;
console.log('m05::',module.exports);
实际导出的是module.exports
module.exports可以导出一个对象
*/

//如果要导出一个对象,只能使用module.exports对象,此时exports对象的值就不会被导出
module.exports = {
	str,
	fn,
	obj
}
exports.test = 'test-exports';
module.exports.arr = [11,22,33];
//module.exports 指向一个新对象 所以不再相等
console.log('module.exports===exports',module.exports==exports);











