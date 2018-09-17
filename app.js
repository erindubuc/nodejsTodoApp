var express = require('express');
var todoController = require('./controllers/todoController');
const ejsLint = require('ejs-lint');
var check = require('syntax-error')

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// serve up static files 
app.use(express.static('assets'));

// fire controllers
todoController(app);
// ejsLint(app);

// listen to port
app.listen(8080);
console.log('you are listening to port 8080');