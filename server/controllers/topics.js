var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

module.exports = (function(){
	return {
		index: function(req,res){
			console.log('in topic index method');
			//JOIN THIS IS HOW YOU JOIN YAY
			Topic.find({}).populate('_user').exec(function (err,topics){
				res.json(topics)
			})
		},
		create: function(req,res){
			User.find({name: req.session.name}, function (err, query){
				if(err){
					json(err)
				}else{
					var thisUser = query[0]
					console.log(thisUser)
					var new_topic = new Topic({
						name: req.body.name,
						desc: req.body.desc,
						category: req.body.category,
						_user: thisUser._id
					})
					new_topic.save(function (err){
						if(err){
							console.log('somethings amiss');
							res.json(err);
						}else{
							thisUser.topics.push(new_topic._id)
							thisUser.save(function (err){
								if(err){
									json(err)
								}else{
									res.redirect('/topics/index')
								}
							})
							
						}
					})
				}

			})
		},
		createCat: function(req,res){
			Category.findOne({name: req.body.name}, function (err,cat){
				if(cat){
					res.json({error: 'Category Already Exists'})
				}else{
					var new_category = new Category({
						name: req.body.name,
						_user: req.params.id
					})
					new_category.save(function (err){
						if(err){
							res.json(err)
						}else{
							res.redirect('/topics/getCategories')
						}
					})
				}
			})
		},
		getCategories: function(req,res){
			console.log('in get categories')
			Category.find({}, function (err, categories){
				res.json(categories)
			})
		},
		getOne: function(req,res){
			Topic.findOne({_id: req.params.id}).populate('_user').exec(function (err,topic){
				res.json(topic)
			})
		}
	}
})()