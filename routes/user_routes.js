var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basic_http_auth');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var User = require(__dirname + '/../models/user');
var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPW(req.body.password);

  user.save(function(err, data) {
    if (err) {
      console.log('The username "' + user.basic.username + '" already exists.');
      return handleError(err, res);
    }

    data.generateToken(function(err, token) {
      res.json({token: token});
    });
  });
});

usersRouter.get('/signin', basicHttp, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('Error');
      return res.status(401).json({msg: 'Access denied: Error.'});
    }

    if (!user) {
      console.log('Incorrect username and/or password');
      return res.status(401).json({msg: 'Access denied: Incorrect username and/or password.'});
    }

    if (!user.checkPW(req.auth.password)) {
      console.log('Incorrect username and/or password');
      return res.status(401).json({msg: 'Access denied: Incorrect username and/or password.'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.json({token: token});
    });
  });
});

usersRouter.get('/users', eatAuth, function(req, res) {
  res.json({username: req.user.username});
});
