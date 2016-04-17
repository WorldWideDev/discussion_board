var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	_topic: {
		type: Schema.Types.ObjectId,
		ref: 'Topic'
	},
	createdAt: {
		type: Date,
		default: new Date
	}
})

var Comment = mongoose.model('Comment', CommentSchema)