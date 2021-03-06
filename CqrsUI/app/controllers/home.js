var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});

router.get('/configuration', function (req, res, next) {
    res.render('configuration');
});

router.get('/uisend', function (req, res, next) {
    res.render('uisend');
});

router.post('/messagePost', function (req, res, next) {
	console.log(req.body.messageUI);
    res.render('uisend');
});