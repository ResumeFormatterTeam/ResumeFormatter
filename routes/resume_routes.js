var express = require('express');
var bodyParser = require('body-parser');
var Resume = require(__dirname + '/../models/resume');
var handleError = require(__dirname + '/../lib/handleError');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var resumesRouter = module.exports = exports = express.Router();
resumesRouter.use(bodyParser.json());

//get
resumesRouter.get('/', eatAuth, function(req, res) {
  Resume.find({userId: req.user._id}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//create
resumesRouter.post('/', eatAuth, function(req, res) {
  var newResume = new Resume(req.body);
  newResume.userId = req.user._id;
  newResume.user = req.user.username;
  newResume.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//update
resumesRouter.put('/:id', eatAuth, function(req, res) {
  var resumeData = req.body;
  delete resumeData._id;
  Resume.update({_id: req.params.id}, resumeData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Update successful!'});
  });
});

//delete
resumesRouter.delete('/:id', eatAuth, function(req, res) {
  Resume.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Delete successful!'});
  });
});
