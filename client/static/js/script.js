var myApp = angular.module('myApp', ['ngRoute'])
console.log('in angular config')
var socket = io.connect();
myApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController',
		controllerAs: 'LC'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController',
		controllerAs: 'DC'
	})
	.when('/topic/:_id', {
		templateUrl: 'partials/topic.html',
		controller: 'TopicController',
		controllerAs: 'TC'
	})
	.when('/user/:_id', {
		templateUrl: 'partials/user.html',
		controller: 'UserController',
		controllerAs: 'UC'
	})
	.otherwise({
		redirectTo: '/'
	})
})