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
var itemOne = Todo({item: 'get flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    // request handlers
    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});
    });
    
    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        // will send data back to frontend
        res.json({todos:data});
    });
    
    app.delete('/todo/:item', function(req, res) {
        
    });
    
};