var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var session = require('express-session')

require('./server/config/mongoose.js');
app.use(bodyParser.json())
app.use(session({secret: 'devoniscool'}))
app.use(express.static(__dirname+'/node_modules'))
app.use(express.static(__dirname+'/client'))

require('./server/config/routes.js')(app)

var server = app.listen(3030, function(){
	console.log('its happening on 3030')
})