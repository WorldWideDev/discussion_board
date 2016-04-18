console.log('in topics')
myApp.factory('TopicFactory', function ($http){
	var factory = {}
	factory.index = function(callback){
		$http.get('/topics/index').success(function (meow){
			callback(meow)
		})
	}
	factory.getCategories = function(callback){
		$http.get('/topics/getCategories').success(function (meow){
			callback(meow)
		})
	}
	factory.getOne = function(topic, callback){
		console.log(topic)
		$http.get('/topics/getOne/'+ topic._id).success(function (meow){
			callback(meow)
		})
	}
	factory.create = function(newTopic, callback){
		console.log(newTopic + ' is new topic')
		$http.post('/topics/create', newTopic).success(function (meow){
			callback(meow)
		})
	}
	factory.getAnswers = function(topic, callback){
		$http.get('/answers/index/' + topic._id).success(function (meow){
			callback(meow)
		})
	}
	factory.createAnswer = function(newAnswer, topicId, callback){
		console.log(topicId);
		$http.post('/answers/create/'+topicId, newAnswer).success(function (meow){
			callback(meow)
		})
	}
	return factory
})
myApp.controller('TopicController', function (TopicFactory,UserFactory){
	self = this;
	//$location.url('/dashboard')
	TopicFactory.index(function (topicQuery){
		self.topics = topicQuery
	})
	UserFactory.getLogged(function (userQuery){
		self.user = userQuery[0]
		console.log(userQuery[0].name + ' is logged user')
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
		})
	}
	self.create = function(){
		TopicFactory.create(self.new_topic, function (topicQuery){
			self.topics = topicQuery
		})
		self.new_topic = ''
	}
	self.createAnswer = function(topicId){
		TopicFactory.createAnswer(self.new_answer, topicId, function (query){
			self.answers = query
		})
		self.new_answer = ''
	}
})