var mongoose = require('mongoose');
var Schema = mongoose.Schema
var deepPopulate = require('mongoose-deep-populate')(mongoose)

var CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	_answer: {
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	},
	createdAt: {
		type: Date,
		default: new Date
	}
})

var Comment = mongoose.model('Comment', CommentSchema)