//load express and create server
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_todo_list')
const db = mongoose.connection
db.on('error',function(){
    console.log('error!')
})
db.once('open',function(){
    console.log('mongodb connected!')
})

//set router of index webpage
app.get('/', function ( req , res){
    res.send('This is the index page!')
})




//set port 3000
app.listen(3000, function () {
    console.log('App is running on http://localhost:3000')
})

