const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   description:{ 
    type:String,
    required:true
   },
   category:{
    type:String,
    required:true
   },
   dueDAte:{
    type:String,
    required:true
   }
});


const TODO =mongoose.model('TODO',todoSchema);

module.exports = todo;