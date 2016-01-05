module.exports = function(app) {
  app.controller('AuthController', ['$scope', '$http', '$cookies', '$route', '$location', function($scope, $http, $cookies, $route, $location) {
    $scope.getUser = function() {
      $scope.token = $cookies.get('token');
      $http.defaults.headers.common.token = $scope.token;
      $http.get('/api/users')
      .then(function(res) {
        $scope.currentUser = res.data.username;
        $location.path('/resumes');
        $route.reload();
      }, function(err) {
        console.log(err);
        //$location.path('/signin');
      });
    };

    $scope.logOut = function() {
      $scope.token = null;
      $scope.currentUser = null;
      $cookies.remove('token');
      $location.path('/');
    };
  }]);
};
