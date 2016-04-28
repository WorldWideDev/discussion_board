myApp.controller('LoginController', function ($location, UserFactory){
	self = this;
	self.logout = function(){
		console.log('in logout')
		UserFactory.logout(function (data){
			$location.url('/')
			self.message = data.message;
		})
	}
	self.create = function(){
		UserFactory.create(self.new_user, function (userQuery){
			self.users = userQuery
			if(userQuery.message){
				console.log('hi')
				self.error = 'Please enter a name'
			}else{
				$location.url('/dashboard')
			}
			// window.location.href = '#/dashboard'
		})
		self.new_user = ''
	}
})