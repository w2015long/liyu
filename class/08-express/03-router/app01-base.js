const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.all('/', (req, res,next) => {
	console.log('all....require')
	next()
});

app.get('/', (req, res,next) => {
	console.log('do something.......')
	next()
	
},(req,res)=>{
	res.send('this is a get require')
});
/*
app.post('/', (req, res) => res.send('this is a post require'));
app.put('/', (req, res) => res.send('this is a put require'));
app.delete('/', (req, res) => res.send('this is a delete require'));
*/

app.listen(port, () => console.log(`app listening on port ${port}`));