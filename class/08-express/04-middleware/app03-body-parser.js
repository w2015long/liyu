const express = require('express')

const querystring = require('querystring'); 


//中间件
const bodyParser = require('body-parser')

const app = express()
const port = 3000;

app.use(express.static('public'))


/*
app.post('/',(req,res)=>{

	let body = '';
	req.on('data',chunk=>{
		body += chunk;
	})
	req.on('end',()=>{
		// console.log(body)
		console.log(querystring.parse(body))
	})
	res.send('<h1>Hello World</h1>')
})
*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('',(req,res)=>{
	console.log('req.body',req.body)
	res.send('<h1>Hello World</h1>')
})

app.listen(port, () => console.log(`app listening on port ${port}`));