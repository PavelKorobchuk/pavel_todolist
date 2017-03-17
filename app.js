const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const app = express();
const config = require('./public/config')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
var db;
app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/public'));
mongoose.connect('mongodb://'+config.DB_USERNAME+':'+config.DB_PASS+'@ds129600.mlab.com:29600/korobchuk_db'); 
app.listen(3000);

var Todo = mongoose.model('Todo', {
  text: String
})
//get all todos
app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err) res.send(err)
    res.json(todos)
  })
})
// create new todo ticket
app.post('/api/todos', function(req, res){
  debugger
  Todo.create({
    text: req.body.text,
    done:false
  }, function(err, todos){
     if (err) res.send(err)
     res.json(todos);
  })
})


app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
      if(err) res.send(err);

      Todo.find(function(err, todos){
        if(err) res.send(err)
        res.json(todos)
      })
  })
})

app.get('*', function(req, res){
res.sendfile(__dirname + '/public/index.html')
});
