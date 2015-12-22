var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGOLAB_URI = 'mongodb://localhost/auth_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpAuth = require(__dirname + '/../lib/basic_http_auth');

describe('http authentication', function() {
  it('should be able to parse http authentication', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('test:123test')).toString('base64')
      }
    };

    httpAuth(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('test');
      expect(req.auth.password).to.eql('123test');
    });
  });
});

describe('auth', function() {
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api')
      .post('/signup')
      .send({username: 'usertest', password: 'testpass'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });
  it('should not duplicate a user with same username', function(done){
      var userData = {username: 'usertest', password:'testpass'};
      chai.request('http://localhost:3000')
      .post('/signup')
      .send(userData)
      .end(function(err, res){
        expect(err).to.eql(null);
        done();
      });
  });

  describe('user already in database', function() {
    before(function(done) {
      var user = new User();
      user.username = 'newusertest';
      user.basic.username = 'newusertest';
      user.hashPW('test1', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done) {
      chai.request('localhost:3000/api')
        .get('/signin')
        .auth('newusertest', 'test1')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it('should be able to authenticate with eat auth', function(done) {
      var token2 = this.token;
      var req = {
        body: {
          token: this.token
        },
        headers: {
          token: this.token
        }
      };

      eatAuth(req, {}, function() {
        expect(req.user.username).to.eql('newusertest');
        done();
      });
    });
  });
});
