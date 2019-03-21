
const EventEmitter = require('events');
class LikeReadStream extends EventEmitter{
	constructor(data,offsetLength){
		super();
		this.data = data;
		this.offsetLength = offsetLength;
		this.on('newListener',(eventName)=>{
			// console.log(eventName);
			if(eventName === 'data'){
				setImmediate(()=>{
					this._dispatch();	
				})				
			}
		})
	}
	_dispatch(){
		// console.log('dispatch....')
		let totalLength = this.data.length;
		let restLength = totalLength;//开始剩下大length==toatallLength;
		while(restLength>0){
			let start = totalLength - restLength;//起始切位置
			let end = start + this.offsetLength;//终止切位置
			let temp = this.data.slice(start,end);
			let buf = Buffer.from(temp);
			this.emit('data',buf);
			restLength -= this.offsetLength;
		}
		this.emit('end');
	}
}

let data = `<section></section><section></section><section></section><section></section><section></section>`
const rs = new LikeReadStream(data,19);

let count = 0;
rs.on('data',(chunk)=>{
	console.log(count++,chunk.toString());
})
rs.on('end',()=>{
	console.log('end.....');
})
