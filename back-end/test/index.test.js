var chai = require('chai');
var assert = require('chai').assert;
var should = require('should');

var request = require('supertest');

var index = require('../routes/index.js');

var host = 'http://localhost:3000';
var mongoose = require('mongoose');

describe('Index Tests', function() {
    describe('POST/task', function() {
        beforeEach(function(done) {
            console.log("Starting it...")
            done();
        });

        after(function(done) {
            console.log("Deleting database...");
            mongoose.connection.db.dropDatabase(done);
        });

        it('It should create a new task!', function(done) {
            request(host)
            .post('/')
            .send({
                'title':'Test my system.',
                'description':"Just test what gotta be tested!"
            })
            .expect(200)
            .end(function(err, res){
                if(err) return done(err);
                res.body.title.should.equal('Test my system.');
                done();
            });
        });

        it('It should not create a task without title field.', function(done) {
            request(host)
            .post('/')
            .send({
                'description':'Go to the mall and buy new clothes.'
            })
            .expect(400)
            .end(function(err, res) {
                if(err) return done(err);   
                done();
            });
        });
    });
});

/*
describe('GET/task', function() {
    it('It shouuld get all tasks!', function(done) {
        request(host)
        .get('/')
        .send({})
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);

            console.log(res.body);

            done();
        });
    });
});
*/