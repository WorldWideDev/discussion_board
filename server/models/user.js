var mongoose = require('mongoose');
var Schema = mongoose.Schema
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	topics: [{
		type: Schema.Types.ObjectId,
		ref: 'Topic'
	}],
	answers: [{
		type: Schema.Types.ObjectId,
		ref: 'Answers'
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
})

var User = mongoose.model('User', UserSchema)