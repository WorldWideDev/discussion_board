var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment');

var users = require('../controllers/users.js')
var topics = require('../controllers/topics.js')
var answers = require('../controllers/answers.js')
var comments = require('../controllers/comments.js')

module.exports = function(app){
	app.get('/users/index/:id', function (req,res){
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
		console.log(req.params.id + ' in route')
		answers.index(req,res)
	})
	app.post('/answers/create/:id', function (req,res){
		answers.create(req,res)
	})
	app.post('/answers/upvote/:id', function (req,res){
		console.log(req.params)
		answers.upvote(req,res)
	})
	app.post('/answers/downvote/:id', function (req,res){
		console.log(req.params)
		console.log('in downvote route')
		answers.downvote(req,res)
	})
	app.get('/comments/index/:id', function (req,res){
		console.log('in comments index routes')
		comments.index(req,res)
	})
	app.post('/comments/create/:id', function (req,res){
		console.log(req.body.content + 'is post data')
		console.log(req.params.id)
		comments.create(req,res)
	})
}