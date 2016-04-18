var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost/discussion_board');
mongoose.set('debug', true)

var models_path = path.join(__dirname, './../models');
console.log(__dirname)

fs.readdirSync(models_path).forEach(function (file){
	if(file.indexOf('.js') >= 0){
		require(models_path + '/' + file)
	}
})
