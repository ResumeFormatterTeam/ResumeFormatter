require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('Resume Controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('resumeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('ResumeController', {$scope:$scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe ('object');
    expect(Array.isArray($scope.resumes)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ResumeController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/resumes').respond(200, [{_id: 1, firstName: 'Goldilocks', lastName: '3Bears'}]);
      $scope.getAll();
      $httpBackend.flush();
      console.log('resume' + $scope.resume);
      console.log($scope.resumes);
      expect($scope.resumes[0].firstName).toBe('Goldilocks');
      expect($scope.resumes[0].lastName).toBe('3Bears');
    });

    it('should be able to create a new resume', function() {
      //might need full schema when posting
      $httpBackend.expectPOST('/api/resumes', {firstName: 'Teddy', lastName: 'Bear'}).respond(200, {firstName: 'Theodore', lastName: 'Roosevelt'});
      expect($scope.resume.length).toBe(0);
      expect($scope.newResume).toEqual($scope.defaults);
      $scope.newResume.firstName = 'Panda';
      $scope.create($scope.newResume);
      $httpBackend.flush();
      expect($scope.resume[0].firstName).toBe('Theodore');
      expect($scope.newResume).toEqual($scope.defaults);
    });

    it('should be able to update a resume', function() {
      var resume = { firstName: 'Grizz', lastName: 'Bear',_id: 1, editing: true};
      $httpBackend.expectPUT('/api/resumes/1', resume).respond(200);
      $scope.updateResume(resume);
      $httpBackend.flush();
      expect(resume.editing).toBe(false);
    });

    it('should be able to delete a resume', function() {
      var resume = { firstName: 'Polar', lastName: 'Bear',_id: 1, editing: true};
      $scope.resume = [resume];
      $httpBackend.expectDELETE('/api/resumes/1', resume).respond(200);
      expect($scope.resume.length).toBe(0);
      expect($scope.resume.indexOf(resume)).toBe(-1);
    });

  });
})


