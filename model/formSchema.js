const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const date = new Date(Date.now());
const formSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        }
    },
    service:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:null
    },
    contacted:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        default:moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }

});

const form = mongoose.model("form",formSchema);
module.exports = form;