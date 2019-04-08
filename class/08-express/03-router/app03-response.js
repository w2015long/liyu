const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/', (req, res) => {

	// res.send('this is a get require')	
	// res.send('<h1>this is a get require</h1>')
	// res.send({name:'Tom',age:18})
	res.json({name:'Tom',age:18})	
});

app.post('/', (req, res) => {
	// res.end('this is a get require')	
	// res.end('<h1>this is a get require</h1>')


	//res.end({name:'Tom',age:18}) //end()不能传对象


	res.json({name:'Tom',age:18})	

});
app.put('/', (req, res) =>{
	res.send('this is a put require')} 
);
app.delete('/', (req, res) => {
	res.send('this is a delete require')
});


app.listen(port, () => console.log(`app listening on port ${port}`));