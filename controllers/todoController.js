var bodyParser = require('body-parser');
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