console.log('in answers')
myApp.factory('AnswerFactory', function ($http){
	var factory = {}
	return factory
})
myApp.controller('AnswerController', function (AnswerFactory, TopicFactory){
	self = this;
	AnswerFactory.index(topic, function (answerQuery){
		self.answers = answerQuery
	})
})