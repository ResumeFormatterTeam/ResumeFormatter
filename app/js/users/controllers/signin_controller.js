module.exports = function(app) {
  require('sweetAlert');
  // require('./../../../../node_modules/sweetalert/dist/sweetalert.min.js');

  app.controller('SigninController', ['$scope', '$http', '$location', '$base64', '$cookies', function($scope, $http, $location, $base64, $cookies) {
    $scope.headingText = 'Sign In to Existing User';
    $scope.buttonText = 'Sign In';

    $scope.authenticate = function(user) {
      sweetAlert("Yay!", "You are now signed in.", "success");
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
        }
      })
      .then(function(res) {
        $cookies.put('token', res.data.token);
        $scope.getUser(); //from auth controller
        $location.path('/resumes');
      }, function(err) {
        sweetAlert("Oops...", "Incorrect username and/or password!", "error");
        console.log(err);
      });
    };

    $scope.changePlaces = function() {
      $location.path('/signup');
    };

  }]);
};
