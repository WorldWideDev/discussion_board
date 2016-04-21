var mongoose = require('mongoose');
var Schema = mongoose.Schema
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var AnswerSchema = new Schema({
	content: {
		type: String,
		requred: true
	},
	upvotes: {
		type: Number,
		default: 0
	},
	downvotes: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	_topic: {
		type: Schema.Types.ObjectId,
		ref: 'Topic'
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	createdAt: {
		type: Date,
		default: new Date
	}
})

var Answer = mongoose.model('Answer', AnswerSchema)