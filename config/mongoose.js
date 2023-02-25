//REQUIRE THE LIBRARY
const mongoose = require('mongoose');

//CONNECT TO THE DATABASE
mongoose.connect('mongodb://localhost/todo_list_db');

//ACQUIRE THE CONNECTION (TO CHECK IF IT IS SUCCESSFUL)
const db = mongoose.connection;

//ERROR
db.on('error',console.error.bind(console,'error connecting to db'));

//UP AND RUNNING THEN PRINT THE MESSAGE
db.once('open',function(){
    console.log('Successfully connected to the database')
});