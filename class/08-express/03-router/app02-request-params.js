const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/users/:userId/books/:booksId', (req, res) => {

	console.log(req.params)//{ userId: '88', booksId: '9898' }


	res.send('this is a get require')	
});

app.post('/', (req, res) => {
	

	res.send('this is a post require')
});
app.put('/', (req, res) =>{
	res.send('this is a put require')} 
);
app.delete('/', (req, res) => {
	console.log(req.query)//{ userId: '123', booksId: '369' }
	res.send('this is a delete require')
});


app.listen(port, () => console.log(`app listening on port ${port}`));