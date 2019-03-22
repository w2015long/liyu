const {Readable} = require('stream');

class MyReadable extends Readable{
	constructor(){
		super();
		this.index = 0;
	}
	_read(){//会推送数据到读取队列
		this.index++;
		if(this.index>5){
			this.push(null);
		}else{
			let str = this.index+'';
			this.push(str);
		}	
	}	
}
const reader = new MyReadable();

let body = '';

reader.on('data',chunk=>{
	// console.log(chunk.toString());
	body += chunk;
});

reader.on('end',()=>{
	console.log("body::",body);
	console.log('end.....')
});
//process.stdout 代表控制台的可写流

reader.pipe(process.stdout);