

const stream = require('stream');
// console.log(stream);
const {Writable} = stream;

// console.log(Writable);
/*
const writer = new Writable();
writer.write('hello');//The _write() method is not implemented
*/
//该函数不能被应用程序代码直接调用。 它应该由子类实现，且只能被内部的 Writable 类的方法调用
//一般情况就是继承该父类
class MyWritable extends Writable{
	_write(chunk, encoding, callback){
		console.log(chunk.toString());
		callback && callback()
	}
}
const writer = new MyWritable();
//writable._write() 方法有下划线前缀，因为它是在定义在类的内部，不应该被用户程序直接调用
writer.write('hello',()=>{
	console.log('callback hello..')
});
//finish是end完触发的
writer.on('finish',()=>{
	console.log('finish.....')
})

writer.end();
