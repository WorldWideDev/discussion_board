myApp.factory('CommentFactory', function ($http){
	var factory = {}
	factory.index = function(topicId, callback){
		$http.get('/comments/index/' + topicId).success(function (meow){
			console.log(meow)
			callback(meow)
		})
	}
	return factory
})