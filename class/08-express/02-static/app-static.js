
const express = require('express');
const app = express();
const port = 3000;

//app.use(express.static(静态资源目录));
app.use(express.static('public'));

//app.use('虚拟路径',express.static(静态资源目录))
//app.use('/static',express.static('public'));

app.get('/',(req,res)=>res.send('this is get required\rHello World'));

app.listen(port, () => console.log(`app listening on port ${port}`));
