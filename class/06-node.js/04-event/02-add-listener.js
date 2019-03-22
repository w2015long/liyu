const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();
emitter.addListener('addTest',()=>{
	console.log('addlistener runing...');
})
emitter.emit('addTest');
/*
//emitter.addListener和emitter.on(eventName, listener)是同一个方法
emitter.on('onTest',()=>{
	console.log('on test runing....')
})
emitter.emit('onTest');
emitter.emit('onTest');
*/
//只能触发一次
emitter.once('onTest',()=>{
	console.log('on test runing....')
})
emitter.emit('onTest');
emitter.emit('onTest');