var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		index: function (req,res){
			console.log('in answer index method');
			Answer.find({_topic: req.params.id}).populate('_topic').populate('_user').exec(function (err, answers){
				res.json(answers);
			})
		},
		create: function (req,res){
			User.find({name: req.session.name}, function (err,user){
				if(err){
					res.json(err);
				}else{
					var thisUser = user[0]
					console.log(thisUser)
					Topic.find({_id: req.params.id}, function (err,topic){
						if(err){
							res.json(err);
						}else{
							var thisTopic = topic[0];
							console.log(thisTopic);
							var new_answer = new Answer({
								content: req.body.content,
								_user: thisUser._id,
								_topic: req.params.id,
								createdAt: new Date
							})
							new_answer.save(function (err){
								if(err){
									res.json(err);
								}else{
									thisUser.answers.push(new_answer._id);
									thisUser.save(function (err){
										if(err){
											res.json(err);
										}else{
											thisTopic.answers.push(new_answer._id)
											thisTopic.save(function (err){
												if(err){
													res.json(err);
												}else{
													console.log(thisTopic._id)
													res.redirect('/answers/index/' + thisTopic._id)
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	}
})()