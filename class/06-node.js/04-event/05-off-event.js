const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();

let fn1 = (arg1,arg2)=>{
	console.log(arg1,arg2);
}
let fn2 = ()=>{
	console.log('fn2 runing...')
}
emitter.on('test1',fn1);
emitter.on('test2',fn2);

emitter.off('test1',fn1);
emitter.removeListener('test2',fn2);
//emitter.removeListener和emitter.off是同一个方法
console.log(emitter.off===emitter.removeListener);//true
emitter.emit('test1','Tom','hello');
emitter.emit('test2');