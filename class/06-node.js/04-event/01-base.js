const EventEmitter = require('events');

/*
//console.log(EventEmitter);
const emiter = new EventEmitter();
emiter.on('test',()=>{
	console.log('test runing....');
})
emiter.emit('test');
*/
//通常我们需要继承EventEmitter类来实现事件
class Emiter extends EventEmitter{

}
const emiter = new Emiter();
emiter.on('test',()=>{
	console.log('test will runing.....');
})
emiter.emit('test');