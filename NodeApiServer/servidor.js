var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.createConnection('mongodb://localhost:27017/ApiAngularWithNode');

var Lista = mongoose.model('Lista', {
    text: String
});

app.get(function() {
    app.use(express.static('env' + '/public'));
    app.use(express.bodyParser());
})

app.post('/api/lista', function(request, response) {
    Lista.create({
        text: request.body.texto
    }, function(error, lista) {
        if (error) {
            response.send(error)
        }
        Lista.find(function(error, lista) {
            if (error) {
                response.send(error);
            }
            response.json(lista);
        })
    })


})

app.get('*', function(request, resource) {
    resource.sendfile('./public/index.html')
});



app.listen(8080, function() {
    console.log('Node Api For Angular 2 in localhost:8080')
});