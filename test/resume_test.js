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
      .post('/api/resume')
      .send(resumeData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.firstName).to.eql('Hannah');
        expect(res.body.lastName).to.eql('Montana');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
  it('should return a json that contains the resume info for a given id', function(done) {
    chai.request('localhost:3000')
    .get('/api/resume/:id')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(req).to.be.json;
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
        .put('/api/resume/' + this.resume._id)
        .send({firstName: 'Captain'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          // string = whatever message is sent back for successful put request
          expect(res.body.msg).to.eql('update success!');
          done();
        });
    });

    it('should be able to remove a resume', function(done) {
      chai.request('localhost:3000')
        .delete('/api/resume/' + this.resume._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          // string = whatever message is sent back for successful delete request
          expect(res.body.msg).to.eql('delete success!');
          done();
        });
    });
  });
});
