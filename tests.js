var chai = require('chai');
var expect = require('chai').expect;

describe('MongoDB Access Layer Test', function () {
    var mongoAccessLayer = require('./www/js/mongoAccessLayer.js');
    it('must have connection to MongoDB', function (done) {
        mongoAccessLayer.connect(function (err, data) {
            expect(data).to.not.equal(null);
            done();
        });
    });

    it('Posts collection must not be null', function (done) {
        mongoAccessLayer.getCollection('posts', {}, function (err, data) {
            expect(data).to.not.equal(null);
            done();
        });
    });

    it('top N docs length should be 10', function (done) {
        mongoAccessLayer.getTopNDocs('posts', {}, {}, 10, function (err, data) {
            expect(data).to.have.length(10);
            done();
        });
    });

    it('must insert new post', function (done) {
        var newPost = {
            email: 'test@test.test',
            title: 'Test Post',
            content: 'This is a test post.',
            creationDate: new Date()
        };
        mongoAccessLayer.insertDocument('posts', newPost, function (err, data) {
            expect(data).to.not.equal(null);
            done();
        })
    });
});