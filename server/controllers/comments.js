var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose)
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment')

module.exports = (function(){
	return {
		index: function(req, res) {
			Topic.findOne({_id: req.params.id}).deepPopulate(['answers.comments', 'answers.comments._user']).exec(function(err, topic) {
				if (err) {
					res.json(err);
				} else {
					res.json(topic);
					}
				})
		},
		create: function(req,res){
			User.findOne({name: req.session.name}, function (err,thisUser){
				if(err){
					json(err);
				}else{
					Answer.findOne({_id: req.params.id}, function (err,thisAnswer){
						if(err){
							json(err);
						}else{
							console.log(thisAnswer._topic)
							console.log(thisUser._id)
							var new_comment = new Comment({
								content: req.body.content,
								_user: thisUser._id,
								_topic: thisAnswer._topic,
								createdAt: new Date
							})
							new_comment.save(function (err){
								if(err){
									res.json(err);
								}else{
									thisUser.comments.push(new_comment._id)
									thisUser.save()
									thisAnswer.comments.push(new_comment._id)
									thisAnswer.save(function (err){
										if(err){
											json(err);
										}else{
											res.redirect('/answers/index/' + thisAnswer._topic)
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