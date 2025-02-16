const express = require('express');
const app = express();
require('./model/index');
require('./model/formSchema');
require('dotenv').config();
const port = process.env.port;
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/',adminRoutes);
app.use('/',router);

app.set('view engine', 'ejs');
app.set('views', './views'); //


app.listen(port,()=>{
    console.log('server is running on port-',port);
})
// 26.52