//load express and create server
const express = require('express')
const app = express()
// setup body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

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

//load the model created by mongoose
const Todo = require('./models/todo')

//set up express-handlebar
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



//set router of index webpage
////router to show all list
app.get('/', function ( req , res){
    Todo.find()
        .lean()
        .then(function(todos){res.render('index',{todos})})
        .catch(function(error){console.error(error)})
})

/////router to open up page for creating new item
app.get('/todos/new',function( req , res){
    res.render('new')
})
////router to view specific item
app.get('/todos/:id', function(req, res){
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then(function(todo){res.render('detail',{todo})})
        .catch(function(error){console.log(error)})
})
////router to edit specific item
app.get('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
      .lean()
      .then((todo) => res.render('edit', { todo }))
      .catch(error => console.log(error))
  })
app.post('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    return Todo.findById(id)
        .then(todo => {
        todo.name = name
        return todo.save()
        })
        .then(()=> res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

////router to add new item
app.post('/todos',function( req , res){
    const name = req.body.name
    return Todo.create({name})
        .then(function(){res.redirect('/')})
        .catch(function(error){console.log(error)})
})
/////router to delete an item
app.post('/todos/:id/delete', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
      .then(todo => todo.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })


//set port 3000
app.listen(3000, function () {
    console.log('App is running on http://localhost:3000')
})

