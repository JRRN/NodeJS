var Express = require('express');
var BodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var Cors = require('cors');
var ObjectID = require('mongodb').ObjectID

var db = new Db('ApiAngularWithNode', new Server('localhost', 27017), { native_parser: false });
var app = Express();


app.use(Cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(BodyParser.json());

app.get(function() {
    app.use(Express.static(path.join(__dirname, 'public')));
})

app.get('/api/lista', function(request, response) {
    db.collection('Lista', function(error, collection) {
        if (error) {
            response.send(error);
        }
        collection.find({}).toArray(function(error, collection) {
            console.log(collection);
            response.send(collection);
        })
    })
});
app.post('/api/lista', function(request, response) {
    var listaCollection = db.collection('Lista');
    listaCollection.insert({
        text: request.body.text
    })
    response.send('Saved!')
});
app.put('/api/lista/:id', function(request, response) {
    var _objectId = new ObjectID(request.params.id);
    console.log(request.body.text);
    db.collection('Lista', function(error, collection) {
        if (error) {
            response.send(error);
        }
        collection
            .updateOne({
                    '_id': _objectId
                }, {
                    $set: {
                        text: request.body.text
                    }
                },
                function(error, item) {
                    if (error) {
                        response.send(error);
                    }
                    response.send('Updated' + item);
                });

    })
});
app.delete('/api/lista/:id', function(request, response) {
    var _objectId = new ObjectID(request.params.id);
    db.collection('Lista', function(error, collection) {
        if (error) {
            response.send(error);
        }
        collection.deleteOne({ '_id': _objectId }, function(error, numberOfDeletedRecords) {
            if (error) {
                response.send('Error deleting Element: ' + error);
            }
            response.send('Deleted : ' + numberOfDeletedRecords);
        })
    })
});

app.get('*', function(request, resource) {
    resource.sendfile('./public/index.html')
});

db.open(function(error, db) {
    if (error) throw error
})

app.listen(8080, function() {
    console.log('Node Api For Angular 2 in localhost:8080')
});