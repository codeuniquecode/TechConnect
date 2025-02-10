const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/techconnect").then(()=>{
     console.log('database connected');
}).catch((e)=>{
    console.log('error in connecting db', e);
});



