var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/resume_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Resume = require(__dirname + '/../models/resume');

describe('resume routes', function() {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should be able to create a resume profile', function(done) {
    //post all required fields (right now assuming just firstName and lastName)
    var resumeData = {firstName: 'Hannah', lastName: 'Montana'}
    chai.request('localhost:3000')
      .post('/api/resumes')
      .send(resumeData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.firstName).to.eql('Hannah');
        expect(res.body.lastName).to.eql('Montana');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
  it('should return a json that contains all the resume ', function(done) {
    chai.request('localhost:3000')
    .get('/api/resumes')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
  describe('to modify the resume database', function() {
    beforeEach(function(done) {
      //populate new resume with required fields
      (new Resume({firstName: 'Tyler', lastName: 'Morgan'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.resume = data;
        done();
      }.bind(this));
    });
    it('should be able to modify a resume', function(done) {
      chai.request('localhost:3000')
        .put('/api/resumes/' + this.resume._id)
        .send({firstName: 'Captain'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Update successful!');
          done();
        });
    });

    it('should be able to remove a resume', function(done) {
      chai.request('localhost:3000')
        .delete('/api/resumes/' + this.resume._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Delete successful!');
          done();
        });
    });
  });
});
