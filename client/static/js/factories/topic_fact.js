myApp.factory('TopicFactory', function ($http){
	var factory = {}
	factory.index = function(callback){
		$http.get('/topics/index').success(function (meow){
			callback(meow)
		})
	}
	factory.indexOne = function(route, callback){
		$http.get('/topics/index/' + route).success(function (meow){
			callback(meow)
		})
	}
	factory.getCategories = function(callback){
		$http.get('/topics/getCategories').success(function (meow){
			callback(meow)
		})
	}
	factory.getOne = function(route, callback){
		console.log(route)
		$http.get('/topics/getOne/'+ route).success(function (meow){
			callback(meow)
		})
	}
	factory.create = function(newTopic, callback){
		console.log(newTopic + ' is new topic')
		$http.post('/topics/create', newTopic).success(function (meow){
			callback(meow)
		})
	}
	factory.createCat = function(newCat, userId, callback){
		$http.post('/topics/createCat/' + userId, newCat).success(function (meow){
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
	factory.upvote = function(answer, callback){
		$http.post('/answers/upvote/' + answer._id).success(function (meow){
			callback(meow)
		})
	}
	factory.downvote = function(answer, callback){
		console.log('in downvote in factory')
		$http.post('/answers/downvote/' + answer._id).success(function (meow){
			callback(meow)
		})
	}
	factory.getComments = function(topic,callback){
		$http.get('/comments/index/' + topic._id).success(function (meow){
			callback(meow)
		})
	}
	factory.createComment = function(newComment, answerId, callback){
		console.log('in create comment factory');
		console.log(newComment)
		$http.post('/comments/create/' + answerId, newComment).success(function (meow){
			callback(meow)
		})
	}
	return factory
})