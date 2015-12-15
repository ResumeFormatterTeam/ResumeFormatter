var mongoose = require('mongoose');
var express = require('express');
var app = express();

var resumesRouter = require(__dirname + '/routes/resume_routes');
// var usersRouter = require(__dirname + '/routes/user_routes');

process.env.APP_SECRET = process.env.APP_SECRET || 'somethingelse';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/resume_app');

app.use(express.static(__dirname + '/build/'));
app.use('/api', resumesRouter);
// app.use('/api', usersRouter);

app.listen(3000, function() {
  console.log('Server up & running!');
});
