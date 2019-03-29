const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'))
app.get('/get', (req, res) => res.send('this is a get require'));
app.post('/post', (req, res) => res.send('this is a post require'));
app.put('/put', (req, res) => res.send('this is a put require'));
app.delete('/delete', (req, res) => res.send('this is a delete require'));

app.listen(port, () => console.log(`app listening on port ${port}`));