var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/ApiAngularWithNode');

var Lista = mongoose.model('Lista', {
    texto: String
});

app.configure(function() {
    app.use(express.static('env' + '/public'));
})

app.get('*', function(request, resource) {
    resource.sendfile('./public/index.html')
});

app.listen(8080, function() {
    console.log('Node Api For Angular 2 in localhost:8080')
});