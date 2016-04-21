myApp.controller('DashboardController', function (TopicFactory,UserFactory){
	console.log('hi ur in new refactored')
	self = this;
	//$location.url('/dashboard')
	TopicFactory.index(function (topicQuery){
		self.topics = topicQuery
	})
	UserFactory.getLogged(function (userQuery){
		self.user = userQuery
		console.log(userQuery.name + ' is logged user')
	})
	TopicFactory.getCategories(function (catQuery){
		self.categories = catQuery
	})
	//console.log(self.thisTopic.name + ' is this topic')

	
	self.getOne = function(topic){
		TopicFactory.getOne(topic, function (query){
			self.thisTopic = query[0]
			TopicFactory.getAnswers(self.thisTopic, function (answerQuery){
				console.log(self.thisTopic)
				self.answers = answerQuery;
			})
			TopicFactory.getComments(self.thisTopic, function (commentQuery){
				console.log(commentQuery + ' is comments')
				self.comments = commentQuery;
			})
		})
	}
	self.create = function(){
		TopicFactory.create(self.new_topic, function (topicQuery){
			self.topics = topicQuery
		})
		self.new_topic = ''
	}
// 	self.createAnswer = function(topicId){
// 		TopicFactory.createAnswer(self.new_answer, topicId, function (query){
// 			self.answers = query
// 		})
// 		self.new_answer = ''
// 	}
// 	self.upvote = function(answer){
// 		TopicFactory.upvote(answer, function (query){
// 			self.answers = query
// 		})
// 		console.log(answer)
// 	}
// 	self.downvote = function(answer){
// 		console.log(answer._user.name)
// 		TopicFactory.downvote(answer, function (query){
// 			self.answers = query
// 		})
// 	}
// 	self.createComment = function(answer){
// 		console.log(answer)
// 		console.log(self.new_comment)
// 		TopicFactory.createComment(self.new_comment, answer, function (query){
// 			self.comments = query
// 		})
// 		self.new_comment = ''
// 	}
})