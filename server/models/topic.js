var mongoose = require('mongoose');
var Schema = mongoose.Schema

var TopicSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	answers: [{
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	}],
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

var CategorySchema = new Schema({
	name: {
		type: String
	}
})


var Topic = mongoose.model('Topic', TopicSchema)
var Category = mongoose.model('Category', CategorySchema)