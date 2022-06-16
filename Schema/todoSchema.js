const mongoose =require("mongoose");

const todoSchema= mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    roll: Number,
    age: Number
});

module.exports=todoSchema;