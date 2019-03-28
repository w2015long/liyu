const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'liyu';

let getWish = (callback)=>{
	
	const client = new MongoClient(url,{ useNewUrlParser: true });	
	// Use connect method to connect to the Server
	client.connect(function(err) {
		console.log("Connected successfully to server");

		const db = client.db(dbName);
		const wish = db.collection('wish');

		callback(wish,client);
	});	
}



const filePath = path.normalize(__dirname+'./../data/wish.json');

const colorArr = ['blue','green','purple','red','pink','orange','coral','fuchsia','#089','#9ad'];

function getRandom(min,max){
	return Math.round(min + (max-min)*Math.random());
}

async function add(options){
	getWish((wish,client)=>{
		options.id = Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0');
		options.color = colorArr[getRandom(0,colorArr.length-1)];
		wish.insertOne(options,(err,result)=>{
	  		if(err) return console.log('insertMany err',err);
	  		console.log(result);
	  		client.close();			
		})
	});
	/*
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	options.id = Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0');
	options.color = colorArr[getRandom(0,colorArr.length-1)];
	//2添加新数据
	arr.push(options)
	//数组转JSON
	let strData = JSON.stringify(arr);
	await writeFile(filePath,strData);
	return options;
	*/
}

async function getData(){
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);	
	return arr;
}

async function remove(id){
	//1获取原有数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2筛选除删除外的其他数据
	let newArr = arr.filter(val=>val['id']!=id);
	//3保存新的数据
	let strData = JSON.stringify(newArr);
	await writeFile(filePath,strData);
}

module.exports = {
	add,
	getData,
	remove
}