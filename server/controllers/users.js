var mongoose = require('mongoose');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

module.exports = (function(){
	return {
		index: function(req,res){
			console.log('in user index method');
			User.find({_id: req.params.id}).populate('topics', 'answers', 'comments').exec(function (err,user){
				res.json(user)
			})
		},
		create: function(req,res){
			console.log('in user create method');
			User.findOne({name:req.body.name}, function (err, user){
				if(err){
					json(err);
				}else{
					if(user){
						console.log(req.session)
						req.session.name = user.name
						res.json(user);
					}else{
						var new_user = new User({
							name: req.body.name
						})
						req.session.name = new_user.name
						console.log(new_user)
						console.log(new_user._id)
						console.log(req.session.name + ' is session name')
						new_user.save(function (err){
							if(err){
								console.log('somethings amiss');
								res.json(err);
							}else{
								console.log('added a new user')
								res.json(new_user)
							}
						})
					}
				}
			})
		},
		getLogged: function(req,res){
			console.log(req.session.name + ' is logged user')
			User.findOne({name: req.session.name}, function (err,user){
				console.log(user)
				res.json(user)
			})
		}
	}
})()