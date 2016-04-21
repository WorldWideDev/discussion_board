myApp.controller('UserController', function ($routeParams,UserFactory){
	self = this;
	var route = $routeParams._id
	UserFactory.index(route, function (query){
		console.log(query)
		self.user = query;
	})

})
