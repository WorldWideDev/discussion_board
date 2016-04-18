var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment');

var users = require('../controllers/users.js')
var topics = require('../controllers/topics.js')
var answers = require('../controllers/answers.js')

module.exports = function(app){
	app.get('/users/index', function (req,res){
		users.index(req,res);
	})
	app.post('/users/create', function (req,res){
		console.log(req.body + ' is post data')
		users.create(req,res);
	})
	app.get('/users/getLogged', function (req,res){
		users.getLogged(req,res)
	})
	app.get('/topics/index', function (req,res){
		topics.index(req,res);
	})
	app.post('/topics/create', function (req,res){
		console.log('in create topic routes')
		console.log(req.body.name + ' is post data')
		topics.create(req,res);
	})
	app.get('/topics/getCategories', function (req,res){
		topics.getCategories(req,res);
	})
	app.get('/topics/getOne/:id', function (req,res){
		console.log(req.params.id + ' is get one param')
		topics.getOne(req,res)
	})
	app.get('/answers/index/:id', function (req,res){
		answers.index(req,res)
	})
	app.post('/answers/create/:id', function (req,res){
		answers.create(req,res)
	})
}