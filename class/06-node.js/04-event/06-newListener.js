const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();
/*
emitter.on('newListener',()=>{
	console.log('newListener.....');
})
emitter.on('test1',()=>{
	console.log('test1 running.........');
})
emitter.on('test2',()=>{
	console.log('test2 running.........');
})
*/
emitter.on('newListener',(eventName,callback)=>{
	console.log('newListener.....');
	console.log(eventName);
	callback();
})
emitter.on('test1',()=>{
	console.log('test1 running.........');
})
emitter.on('test2',()=>{
	console.log('test2 running.........');
})