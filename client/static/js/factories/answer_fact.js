myApp.factory('AnswerFactory', function ($http){
	var factory = {}
	factory.index = function(topicId, callback){
		console.log(topicId)
		$http.get('/answers/index/' + topicId).success(function (meow){
			console.log(meow)
			callback(meow)
		})
	}
	return factory
})