var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/resume_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Resume = require(__dirname + '/../models/resume');
var User = require(__dirname + '/../models/user');

describe('All routes on the resume app', function() {
  var token = "";
  var newToken = "";
  var userId = "";
    before(function(done){
      var userData = {username: 'JimmyMontana', password:'foobar123'};
      chai.request('http://localhost:3000')
      .post('/api/signup')
      .send(userData)
      .end(function(err, res){
        token = res.body.token;
        User.findOne({'basic.username': 'JimmyMontana'}, function(err, user){
            userId = user.id;
        });
        expect(err).to.eql(null);
        expect(token).to.not.eql("");
        done();
      });
    });
  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  describe('authorization routes', function(done){

    it('should have created a user with a the post request above', function(done){
        User.findOne({'basic.username': 'JimmyMontana'}, function(err, user){
          expect(user).to.not.eql(null);
          expect(user.username).to.eql('JimmyMontana');
          done();
        });
    });
  });
  it('should be able to log in with an existing username', function(done){
      chai.request('http://localhost:3000')
      .get('/signin')
      .auth('JimmyMontana', 'foobar123')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.token).to.not.eql("");
        done();
      });
    });
  it('should be able to create a resume', function(done) {
    //post all required fields (right now assuming just firstName and lastName)
    var resumeData = {firstName: 'Hannah', lastName: 'Montana', token: token}
    chai.request('localhost:3000')
      .post('/api/resumes')
      .send(resumeData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.firstName).to.eql('Hannah');
        expect(res.body.lastName).to.eql('Montana');
        expect(res.body.userId).to.eql(userId);
        expect(res.body).to.have.property('_id');
        done();
      });
  });
  describe('to modify the resume database', function() {
    beforeEach(function(done) {
      //populate new resume with required fields
      (new User({username:'TylerMorgan', password:'foobar123'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.user = data;
        (new Resume({firstName: 'Tyler', lastName: 'Morgan', userId: this.user.id})).save(function(err, data) {
          expect(err).to.eql(null);
          this.resume = data;
          chai.request('http://localhost:3000')
          .get('/signin')
          .auth('JimmyMontana', 'foobar123')
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(token).to.not.eql("");
            newToken = token;
            done();
          });
        }.bind(this));
      }.bind(this));
    });
    it('should be able to get a specific resume', function(done) {
      chai.request('localhost:3000')
        .get('/api/resumes/')
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
    it('should be able to modify a resume', function(done) {
      chai.request('localhost:3000')
        .put('/api/resumes/' + this.resume._id)
        .send({firstName: 'Captain', token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Update successful!');
          done();
        });
    });

    it('should be able to remove a resume', function(done) {
      chai.request('localhost:3000')
        .delete('/api/resumes/' + this.resume._id)
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Delete successful!');
          done();
        });
    });
  });
});
