const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}
const emitter = new MyEmitter();
emitter.on('test',(arg1,arg2)=>{
	console.log(arg1,arg2);//没有event对象
})
//和浏览器端的事件不同,传入参数不用数组而是参数列表
emitter.emit('test','Tom','hello');


const args = ['hello','Leo']
emitter.on('argTest',(arg1,arg2)=>{
	console.log(arg1,arg2);
})
emitter.emit('argTest',...args);