const express = require('express');

const app = express();
const port = 3000;


app.use(express.static('public'));

// app.all('/', (req, res) => res.send('this is a get require'));
app.use('/user',require('./routers/user.js'))

app.use('/blog',require('./routers/blog.js'))

app.listen(port, () => console.log(`app listening on port ${port}`));