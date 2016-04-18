var mongoose = require('mongoose');
var Schema = mongoose.Schema

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
	}]
})

var User = mongoose.model('User', UserSchema)