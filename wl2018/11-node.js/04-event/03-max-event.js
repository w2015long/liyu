const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();

//一个EventEmitter对象默认最大可以有10个监听,可以通过emitter.setMaxListeners(n)来设置最大监听数
emitter.setMaxListeners(11);
emitter.on('test',()=>{
	console.log('1::: test runing...');
})
emitter.on('test',()=>{
	console.log('2::: test runing...');
})
emitter.on('test',()=>{
	console.log('3::: test runing...');
})
emitter.on('test',()=>{
	console.log('4::: test runing...');
})
emitter.on('test',()=>{
	console.log('5::: test runing...');
})
emitter.on('test',()=>{
	console.log('6::: test runing...');
})
emitter.on('test',()=>{
	console.log('7::: test runing...');
})
emitter.on('test',()=>{
	console.log('8::: test runing...');
})
emitter.on('test',()=>{
	console.log('9::: test runing...');
})
emitter.on('test',()=>{
	console.log('10::: test runing...');
})
emitter.on('test',()=>{
	console.log('11::: test runing...');
})
emitter.emit('test');
