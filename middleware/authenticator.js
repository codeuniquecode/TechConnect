const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const {promisify} = require('util');
const admin = require('../model/adminSchema');
exports.isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.redirect('/login');
        return res.status(500).end();
    }
    const id = await promisify (jwt.verify)(token,process.env.KEY);
    console.log(id);
    const adminData = admin.findById({id});
    if(adminData){
        next();
    }
    else{
        res.send('you are not allowed to view this page');
    }
}
