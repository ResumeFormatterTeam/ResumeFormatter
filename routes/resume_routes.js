var express = require('express');
var bodyParser = require('body-parser');
var Resume = require(__dirname + '/../models/resume');
var handleError = require(__dirname + '/../lib/handleError');

var resumesRouter = module.exports = exports = express.Router();

//get
resumesRouter.get('/resumes', function(req, res) {
  Resume.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//get request to specific resume by id
resumesRouter.get('/resumes/:id', function(req, res) {
  Resume.find({_id: req.params.id}, function(err, data) {
    if(err) return handleError(err, res);

    res.json(data)
  });
});

//create
resumesRouter.post('/resumes', bodyParser.json(), function(req, res) {
  var newResume = new Resume(req.body);
  console.log(newResume);
  newResume.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//update
resumesRouter.put('/resumes/:id', bodyParser.json(), function(req, res) {
  var resumeData = req.body;
  delete resumeData._id;
  Resume.update({_id: req.params.id}, resumeData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Update successful!'});
  });
});

//delete
resumesRouter.delete('/resumes/:id', function(req, res) {
  Resume.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Delete successful!'});
  });
});
