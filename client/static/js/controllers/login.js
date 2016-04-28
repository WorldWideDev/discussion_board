myApp.controller('LoginController', function ($location, UserFactory){
	self = this;
	UserFactory.logout()
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