module.exports = function(app) {
  app.factory('currentResume', function() {
    return function() {
      var resume = {
        firstName:'',
        lastName:'',
        jobTitle:'',
        phoneNumber:'',
        email:'',
        website:'',
        linkedIn:'',
        personalSummary:'',
        proficient: [''],
        developing: [''],
        projects:[{}],
        experience:[{}],
        education:[{}]
      }
      return resume;
    };
  });
};
