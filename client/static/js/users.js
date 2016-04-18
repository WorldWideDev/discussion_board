console.log('in users')
myApp.factory('UserFactory', function ($http){
	var factory = {}
	factory.index = function(callback){
		$http.get('/users/index').success(function (meow){
			console.log(meow)
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
myApp.controller('UserController', function ($location, UserFactory){
	self = this;
	UserFactory.index(function (userQuery){
		self.users = userQuery
	})
	self.create = function(){
		UserFactory.create(self.new_user, function (userQuery){
			self.users = userQuery
			$location.url('/dashboard')
			// window.location.href = '#/dashboard'
		})
		self.new_user = ''
	}
})