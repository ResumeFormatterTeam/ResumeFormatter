var express = require('express');
var bodyParser = require('body-parser');
var Resume = require(__dirname + '/../models/resume');
var handleError = require(__dirname + '/../lib/handleError');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var resumesRouter = module.exports = exports = express.Router();
resumesRouter.use(bodyParser.json());

//get request to get all Resumes
resumesRouter.get('/resumes/', function(req, res) {
  Resume.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});


// //get
// resumesRouter.get('/resumes', eatAuth, function(req, res) {
//   Resume.find({userId: req.user._id}, function(err, data) {
//     if (err) return handleError(err, res);
//     res.json(data);
//   });
// });


//get user's resume
resumesRouter.get('/resumes/:userName', function(req, res) {
  Resume.find({userName: req.params.userName}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//create
resumesRouter.post('/resumes', eatAuth, function(req, res) {
  var newResume = new Resume(req.body);
  newResume.userId = req.user._id;
  newResume.userName = req.user.username;
  newResume.user = req.user.username;
  newResume.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

//update
resumesRouter.put('/resumes/:userId', eatAuth, function(req, res) {
  var resumeData = req.body;
  delete resumeData.userId;
  Resume.update({userId: req.params.userId}, resumeData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Update successful!'});
  });
});

//delete
resumesRouter.delete('/resumes/:id', eatAuth, function(req, res) {
  Resume.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg:'Delete successful!'});
  });
});




