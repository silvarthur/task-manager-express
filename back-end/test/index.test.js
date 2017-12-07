var chai = require('chai');
var assert = require('chai').assert;
var should = require('should');

//var request = require('request');
var request = require('supertest');

var index = require('../routes/index.js');

var host = 'http://localhost:3000';

describe('Index Tests', function() {
    describe('POST/task', function() {
        it('It should create a new task!', function(done) {
            request(host)
            .post('/')
            .send({
                'title':'title9',
                'description':'description9'
            })
            .expect(200)
            .end(function(err, res){
                if(err) return done(err);
                res.body.title.should.equal('test12');
                done();
            });
        })
    })
});