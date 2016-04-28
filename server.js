var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var session = require('express-session')

require('./server/config/mongoose.js');
app.use(bodyParser.json())
app.use(session({secret: 'devoniscool'}))
app.use(express.static(__dirname+'/node_modules'))
app.use(express.static(__dirname+'/client'))

require('./server/config/routes.js')(app)

var server = app.listen(3030, function(){
	console.log('its happening on 3030')
})

var io = require('socket.io').listen(server);

var Answer = mongoose.model('Answer');

io.sockets.on('connection', function (socket){
	console.log(socket.id, 'socked id')
	console.log('using sockets')
	socket.on('test', function (data){
		console.log(data)
		io.emit('test_back', {lol: 'lol'})
	})
	socket.on('user_entered', function (data){
		console.log(data.upvoted + ' is socket data')
	})
	socket.on('upvote', function (data){
		console.log(data.upvoted.content + ' is socket data')
		Answer.findOne({_id: data.upvoted._id}, function (err, answer){
			console.log(answer + ' in socket')
			answer.upvotes += 1;
			answer.save(function (err){
				if(err){
					console.log('somethings amiss')
					res.json(err);
				}else{
					console.log('upvote success')
					io.emit('upvoting', {upvoted: answer})
				}
			})
		})
	})
	socket.on('downvote', function (data){
		console.log(data.downvoted.content + ' is socket data')
		Answer.findOne({_id: data.downvoted._id}, function (err, answer){
			console.log(answer + ' in socket')
			answer.downvotes += 1;
			answer.save(function (err){
				if(err){
					console.log('somethings amiss')
					res.json(err);
				}else{
					console.log('downvote success')
					io.emit('downvoting', {downvoted: answer})
				}
			})
		})
	})
	socket.on('message_added', function (data){
		console.log(data)
		io.emit('new_message', {
			message: data.message,
			user: data.user
		})
	})
})