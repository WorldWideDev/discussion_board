var myApp = angular.module('myApp', ['ngRoute'])
console.log('in angular config')
myApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/topic/:_id', {
		templateUrl: 'partials/topic.html'
	})
	.when('/user', {
		templateUrl: 'partials/user.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})