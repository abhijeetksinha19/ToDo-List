const { response } = require('express');
const express = require('express');
const path = require('path');
const port = 8000;


//FOR MONGOOSE
const db = require('./config/mongoose');
const TODO = require('./models/todo');


const app = express();


//EJS
app.set('view engine', 'ejs');


//SETTING DIRICTIORY FOR VIEWS 
app.set('views', path.join(__dirname,'views'));


//MIDDLEWARE
app.use(express.urlencoded());
app.use(express.static('assets'));


//TODO LIST
var ToDo =[
    {
        description:" ",
        category:" ",
        dueDate:" ",
    }
]


//RENDERING
app.get('/',function(req, res){

    TODO.find({}, function(err, toDo){
        if (err){
            console.log('Error in fetching Todo from db');
            return
        }
        return res.render('home',{
            title:"My ToDo App",
            ToDo_List: toDo
         });
    });
  
});


//FROM FORM
app.post('/create-todo',function(req,res){
   TODO.create({
    description:req.body.description,
    category:req.body.category,
    dueDate:req.body.dueDate
   },
   //CALL-BACK FUNCTION
   function(err,newTodo){
    if (err){console.log('error in creating a todo!');
    return;}
    console.log ('********', newTodo);
    //RETURN FUNCTION
    return response.redirect('back');
   });
});


//FOR DELETETING A TODO
app.get('/delete-todo', function(req,res){
    //GET THE ID FROM QUERY IN THE PARAMETERS(URL)
    let id = req.query.id;
    //FIND THE TODO IN THE DATABASE USING ID AND DELETE IT
    TODO.findByIDAndDelete(id, function(err){
        if (err){
            console.log('error in deleting an object from database');
            return;
        }
         //GOING TO THE SAME PAGE
        return res.redirect('back');
    });
});


//TO RUN THE SERVER
app.listen(port, function(err){
    //IF ERROR
    if (err) {console.log('Error in running the server',err);}
    //IF THE SERVER RUNS
    console.log('Yup!My Express Server is Running on Port: ',port);
});
