const express= require('express');
const mongoose =require("mongoose");
const todohandler = require('./routerHandler/todoHandler');
const app=express();
app.use(express.json());


mongoose
.connect('mongodb://localhost:27017/todos')
.then(()=>console.log("cunnection is successful"));
 
app.use('/todo',todohandler);

app.listen(4000,()=>{
    console.log("server running port 0000")
})
