myApp.controller('TopicController', function ($routeParams,TopicFactory,UserFactory,AnswerFactory,CommentFactory){
	self = this;
	//$location.url('/dashboard')
	var route = $routeParams._id
	console.log($routeParams)
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
		TopicFactory.upvote(answer, function (query){
			self.answers = query.answers;
		})
		console.log(answer)
	}
	self.downvote = function(answer){
		console.log(answer._user.name)
		TopicFactory.downvote(answer, function (query){
			self.answers = query.answers;
		})
	}
	self.createComment = function(answerId, newComment){
		console.log(answerId)
		console.log(newComment)
		TopicFactory.createComment(newComment, answerId, function (query){
			self.answers = query.answers;
		})
		self.new_comment = ''
	}
})
