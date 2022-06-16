const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../Schema/todoSchema');

const Todo =  new mongoose.model("Todo",todoSchema);


router.get('/', async(req,res)=>{
  let data =  await Todo.find().select({
    _id: 0,
    __v:0,

  })
  .limit(2);
    res.send(data)
})


router.get('/showsingle/:id', async(req, res) => {
    let data= await Todo.find({_id: req.params.id})
    res.send(data);
})

// insert one item....
router.post('/', async(req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error: "There was a server side error!"
            });
        }else{
            res.status(200).json({
                message: "Todo was inserted successfull"
            });
        }
    });
});

//multiple value add ...
router.post('/all', async(req,res)=>{
  await Todo.insertMany(req.body,(err)=>{
    if(err){
        res.status(500).json({
            error: "There was a server side error!"
        });
    }else{
        res.status(200).json({
            message: "Todos were inserted successfully"
        });
    }

})
})

//update item
router.put('/:id', async(req,res)=>{

  const result = await Todo.findByIdAndUpdate({_id:req.params.id},{
    name: req.body.name,
    roll: req.body.roll,
    age: req.body.age,

    },(err)=>{
        if(err){
            res.send(500).json({
                error: "There was a server side error!"
            });
        }else{
            res.send(200).json({
                message: "Todo was updated successfully"
            });
        }
    })
    console.log(result);

})

router.delete('/:id', async(req,res)=>{
    await Todo.deleteOne({_id: req.params.id},(err)=>{

        if(err){
            res.status(500).json({
                error: "There was a server side error!"
            });
        }else{
            res.status(200).json({
                message: "Todo was deleted successfully"
            });
        }
    })

})



module.exports =router;