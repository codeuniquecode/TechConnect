const mongoose = require('mongoose');
const moment = require('moment');

const date = new Date(Date.now());
const adminSchema = mongoose.Schema({
    googleId: { type: String, unique: true,sparse:true },
    email: { type: String, unique: true, required:true },
    password:{type:String},
    createdAt: {
        
                type:String,
                default:moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
});
const admin = mongoose.model("admin",adminSchema);
module.exports = admin;