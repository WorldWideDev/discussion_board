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
	}]
})

var User = mongoose.model('User', UserSchema)