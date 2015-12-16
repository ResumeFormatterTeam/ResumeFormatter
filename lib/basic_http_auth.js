module.exports = function(req, res, next) {
  var pW = (req.headers.authorization || ':').split(' ')[1];
  var pWBuffer = new Buffer(pW, 'base64');
  var pWSplit = pWBuffer.toString('utf8').split(':');
  req.auth = {
    username: pWSplit[0],
    password: pWSplit[1]
  };

  if (!(req.auth.username && req.auth.password)) {
    console.log('No basic Auth provided.');
    return res.status(401).json({msg: 'No basic Auth provided.'});
  };

  next();
};
