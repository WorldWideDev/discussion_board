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
		console.log(catQuery)
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
	self.createTopic = function(){
		TopicFactory.create(self.new_topic, function (topicQuery){
			self.topics = topicQuery
		})
		self.new_topic = ''
	}
	self.createCat = function(){
		TopicFactory.createCat(self.new_category, self.user._id, function (catQuery){
			console.log(catQuery)
			if(catQuery.message){
				console.log('in if')
				self.err = catQuery.message
			}
			else if(catQuery.error){
				console.log('in else if')
				self.err = catQuery.error
			}else{
				console.log('in else')
				self.categories = catQuery
			}
			self.new_category = ''
		})
	}
})