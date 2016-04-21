myApp.factory('UserFactory', function ($http){
	var factory = {}
	factory.index = function(userId,callback){
		$http.get('/users/index/' + userId).success(function (meow){
			callback(meow)
		})
	}
	factory.create = function(newUser, callback){
		console.log(newUser)
		$http.post('/users/create', newUser).success(function (meow){
			callback(meow)
		})
	}
	factory.getLogged = function(callback){
		$http.get('/users/getLogged').success(function (meow){
			console.log(meow)
			callback(meow)
		})
	}
	return factory
})