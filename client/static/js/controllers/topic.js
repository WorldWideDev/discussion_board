myApp.controller('TopicController', function ($routeParams,TopicFactory,UserFactory,AnswerFactory,CommentFactory,$scope){
	socket.emit('test', {sup: 'sup'})
	socket.on('test_back', function (data){
		console.log(data)
	})
	self = this;
	console.log('topic comptroller')
	var route = $routeParams._id
	TopicFactory.getOne(route, function (topicQuery){
		self.thisTopic = topicQuery
	})
	AnswerFactory.index(route, function (topic){
		self.answers = topic.answers;
	})
	UserFactory.getLogged(function (userQuery){
		self.curr_user = userQuery
	})
	CommentFactory.index(route, function (commentQuery){
		self.comments = commentQuery;
	})
	self.createAnswer = function(topicId){
		TopicFactory.createAnswer(self.new_answer, topicId, function (query){
			self.answers = query.answers;
		})
		self.new_answer = ''
	}
	self.upvote = function(answer){
		console.log(answer)
		socket.emit('upvote', {upvoted: answer})
	}

	socket.on('upvoting', function (data){
		AnswerFactory.index(route, function (topic){
			self.answers = topic.answers;
		})
	})

	self.downvote = function(answer){
		console.log(answer._user.name)
		socket.emit('downvote', {downvoted: answer})
		
	}
	socket.on('downvoting', function (data){
		AnswerFactory.index(route, function (topic){
			self.answers = topic.answers;
		})
	})
	self.createComment = function(answerId, newComment){
		console.log(answerId)
		console.log(newComment)
		TopicFactory.createComment(newComment, answerId, function (query){
			self.answers = query.answers;
		})
		self.new_comment = ''
	}

})
