myApp.controller('ChatController', function (ChatFactory,UserFactory,$timeout){
	var self = this;
	self.messages = []
	self.item = 0

	// UserFactory.getLogged(function (userQuery){
	// 	self.curr_user = userQuery
	// 	console.log(self.curr_user)
	// })

	console.log(self)
	console.log(self.curr_user)
	var count = 0
	self.toggle = function(){

		console.log('in toggle')
		if(count%2 == 0){
			console.log('even')
			self.item = 1
			count++
		}else{
			console.log('odd')
			self.item = 0
			count ++
		}
	}
	self.post = function(){
		console.log(self)
		var _message =  self.new_message
		UserFactory.getLogged(function (userQuery){
			console.log(_message)
			self.curr_user = userQuery
			socket.emit('message_added', {
				message: _message, 
				user: self.curr_user
			})
		})
		
		//console.log(self.messages)
		self.new_message = ''
	}
	console.log(self.messages)

	socket.on('new_message', function (data){
		console.log(data)
		console.log(data.message.txt)
		self.messages.push({
			txt: data.message.txt,
			user: data.user.name
		})
		console.log(self.messages)
		var div = document.querySelector('#chatBody')
		$timeout(function(){
			div.scrollTop = div.scrollHeight;
		})

	})
})