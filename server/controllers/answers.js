var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		index: function (req,res){
			console.log('in answer index method');

			Topic.findOne({_id: req.params.id})
			.deepPopulate(['answers', 'answers._user', 'answers.comments', 'answers.comments._user'])
			.exec(function (err, topic){
				res.json(topic);
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
		},
		// upvote: function (req,res){
		// 	Answer.findOne({_id: req.params.id}, function (err, answer){
		// 		console.log(answer)
		// 		answer.upvotes += 1;
		// 		answer.save(function (err){
		// 			if(err){
		// 				console.log('somethings amiss')
		// 				res.json(err);
		// 			}else{
		// 				console.log('upvote success')
		// 				res.redirect('/answers/index/' + answer._topic)
		// 			}
		// 		})
		// 	})
		// },
		downvote: function (req,res){
			Answer.findOne({_id: req.params.id}, function (err, answer){
				console.log(answer)
				answer.downvotes += 1;
				answer.save(function (err){
					if(err){
						console.log('somethings amiss')
						res.json(err);
					}else{
						console.log('downvote success')
						console.log(answer._topic)
						res.redirect('/answers/index/' + answer._topic)
					}
				})
			})
		},
	}
})()