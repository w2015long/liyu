console.log(1)
let timer = setTimeout(()=>{
	console.log(2)
},200);
clearTimeout(timer)
console.log(3);


console.log('a');
let id = setInterval(()=>{
	console.log('b');
},500)
clearInterval(id)
console.log('c');


console.log('x...');
setImmediate(()=>{
	console.log('y...')
})
console.log('z...');