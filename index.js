//load express and create server
const express = require('express')
const app = express()

//set up database by mongodb and mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_todo_list')
const db = mongoose.connection

db.on('error',function(){
    console.log('error!')
})
db.once('open',function(){
    console.log('mongodb connected!')
})

//set up express-handlebar
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



//set router of index webpage
app.get('/', function ( req , res){
    res.render('index')
})

//set port 3000
app.listen(3000, function () {
    console.log('App is running on http://localhost:3000')
})

