var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token;
  var bodyToken = (req.body)? req.body.token : undefined;
  token = token || bodyToken;

  if (!token) {
    console.log('No token.');
    return res.status(401).json({msg: 'No token.'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Access denied.'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'Access denied.'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'Access denied.'});
      }

      req.user = user;
      next();
    });
  });
};
