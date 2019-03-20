const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();
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
emitter.emit('test');
