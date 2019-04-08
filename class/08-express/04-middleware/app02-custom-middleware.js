const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//version 1
/*
const server = http.createServer((req,res)=>{
	res.end('ok')
})
*/

//version 2 
/*
const app = (req,res)=>{
	res.end('ok')
}
const server = http.createServer(app)
*/


//version 3
/*
const express = ()=>{
	const app = (req,res)=>{
		res.end('ok')
	}

	return app	
}

const app = express();
const server = http.createServer(app)
*/

//version 4

const express = ()=>{
	let fns = [];
	const app = (req,res)=>{
		let i = 0;
		let next = ()=>{
			let fn = fns[i++];
			if(!fn) return
			fn(req,res,next)
		}
		next()
	}
	app.use = (fn)=>{
		fns.push(fn)
	}

	return app
}

const app = express();
const server = http.createServer(app)

app.use((req,res,next)=>{
	console.log('A1')
	next()
	console.log('A2')
})

app.use((req,res,next)=>{
	console.log('B1')
	next()
	console.log('B2')
})

app.use((req,res,next)=>{
	console.log('C1')
	next()
	console.log('C2')
})

server.listen(port,hostname,()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
})