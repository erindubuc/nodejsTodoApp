var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://test:testing1@ds259802.mlab.com:59802/todo', {useNewUrlParser: true });

// create a schema - this is like a blueprint for the data
// what kind of info mongo will expect from our data
var todoSchema = new mongoose.Schema({
    item: String
});
// create a model
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    // request handlers
    app.get('/todo', function(req, res) {
        // get data from mongodb and pass it to the view
        // find gets all the items in the collection
        Todo.find({}, function(err, data){
           if (err) throw err;
           res.render('todo', {todos: data});
        });
        
    });
    
    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json({todos:data});
        });
    });
    
    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json({todos:data});
        });
    });
    
};