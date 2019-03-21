
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();

emitter.on('myEv',(arg1,arg2)=>{
	console.log(arg1,arg2);
})
emitter.emit('myEv','eventName','callback');