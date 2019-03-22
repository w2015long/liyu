const fs = require('fs');

const util = require('util');
const filePath = 'data.json';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function add(name){
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2添加新数据
	// console.log(arr);
	arr.push({
		id:Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0'),
		name:name
	})
	//数组转JSON
	let strData = JSON.stringify(arr);
	await writeFile(filePath,strData);
	return arr;
}

async function getData(id){
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	return arr.find(val=>val['id']==id);	
}

async function updataData(id,name){
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2.查找对应修改的数据id
	let obj = arr.find(val=>val['id']==id);
	//3updata
	if(obj){
		obj.name = name;
		//修改后保存		
		let strData = JSON.stringify(arr);
		await writeFile(filePath,strData);
		return arr;		
		
	}else{
		return obj;
	}
}
updataData('15532516187653119','Peter')
.then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log('this is err::',err);
})
/*
getData('15532516187653119')
.then(data=>{
	console.log('get id',data);
})
.catch(err=>{
	console.log('this is err::',err);
})
*/
/*
add('Amy')
.then(data=>{
	console.log(data)
})
.catch(err=>{
	console.log('this is err::',err);
})
*/