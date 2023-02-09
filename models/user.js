const mongoose = require("mongoose");
const dotenv = require('dotenv');
// var conn = mongoose.Collection;

var User= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:{
        type : String,
        require:true,
        
    },
    lastname:{
        type : String,
        require:true,
        
    },
    email:{
        type : String,
        require:true,
        unique:true,
        match: /[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        
    },
    password:{
        type : String,
        require:true,
        unique: true
        
    },
    
});

var userModel= mongoose.model('Users', User);
module.exports=userModel;