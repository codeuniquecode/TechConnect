const express = require('express');
const app = express();
require('./model/index');
require('dotenv').config();
const port = process.env.port;
app.use(express.static('./public'));
const router = require('./routes/userRoutes');
app.use('/',router);

app.set('view engine', 'ejs');
app.set('views', './views'); //


app.listen(port,()=>{
    console.log('server is running on port-',port);
})
// 26.52