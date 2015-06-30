'use strict';

require('../test-helper');

var request = require('supertest'),
    should = require('should'),
    app = require('../../../server'),
    db = require('../../../initializers/database'),
    HelperFixture = require('../fixtures/helper');

var existingHelper;


describe('Helpers Controller', function() {

    // connects to DB
    before(function(done) {
        db.connect().finally(done);
    });

    // resets the database
    beforeEach(function(done) {
        db.helpers
        .removeAsync({})
        .then(function() {
            return db
            .helpers
            .insertAsync(HelperFixture.data);
        })
        .finally(done);
    });

    describe('GET /helpers', function() {

        it('lists all helpers on database', function(done) {
            request(app)
            .get('/api/helpers')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                res.body.length.should.equal(HelperFixture.data.length);

                done();
            });
        });

        describe('attributes', function() {

            var response;
            before(function(done) {
                request(app)
                .get('/api/helpers')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response = res.body;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                response.forEach(function(helper) {
                    helper._id.should.be.a.String();
                });
                done();
            });
            
            it('returns the name', function(done) {
                response.forEach(function(helper) {
                    helper.name.should.be.a.String();
                });
                done();
            });
            
            it('returns the function', function(done) {
                response.forEach(function(helper) {
                    helper.fn.should.be.a.String();
                });
                done();
            });

        });

    });

    describe('POST /helpers', function() {

        it('creates a new helper', function(done) {
            request(app)
            .post('/api/helpers')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(HelperFixture.valid)
            .end(function(err, res) {
                res.status.should.equal(201);
                res.body.should.have.property('_id');

                done();
            });
        });

        describe('unique keys', function() {

            var helper = HelperFixture.valid;

            function sendHelper(m) {
                return request(app)
                .post('/api/helpers')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(m);
            }

            it('does not allow repeated names', function(done) {
                sendHelper(helper)
                .end(function(err, res) {
                    sendHelper(helper)
                    .end(function(err1, res1) {
                        res1.status.should.equal(400);
                        res1.body.should.not.have.property('_id');

                        done();
                    });
                });
            });

        });

    });

    describe('GET /helpers/:id', function() {

        beforeEach(loadExistingHelper);

        it('shows details about a given helper', function(done) {
            request(app)
            .get('/api/helpers/' + existingHelper._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Object();

                done();
            });
        });

        describe('attributes', function() {

            var helper;
            beforeEach(function(done) {
                request(app)
                .get('/api/helpers/' + existingHelper._id)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    helper = res.body;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                helper.should.have.property('_id');
                helper._id.should.be.a.String();
                helper._id.should.equal(existingHelper._id.toString());
                done();
            });
            
            it('returns the name', function(done) {
                helper.name.should.be.a.String();
                done();
            });
            
            it('returns the function', function(done) {
                helper.fn.should.be.a.String();
                done();
            });

        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .get('/api/helpers/000000000000000000000000')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.should.be.an.Object();
                res.body.should.have.property('message');
                res.body.message.should.match(/not found/);

                done();
            });
        });

    });

    describe('PATCH /helpers/:id', function() {

        beforeEach(loadExistingHelper);

        it('should update a helper', function(done) {
            existingHelper.fn = 'function() {}';

            request(app)
            .patch('/api/helpers/' + existingHelper._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingHelper)
            .end(function(err, res) {
                res.status.should.equal(202);
                res.body.should.have.property('fn');
                res.body.fn.should.equal(existingHelper.fn);

                done();
            });
        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .patch('/api/helpers/000000000000000000000000')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingHelper)
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.should.be.an.Object();
                res.body.should.have.property('message');
                res.body.message.should.match(/not found/);

                done();
            });
        });

    });

    describe('DELETE /helpers/:id', function() {

        beforeEach(loadExistingHelper);

        it('should delete a helper', function(done) {
            request(app)
            .delete('/api/helpers/' + existingHelper._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(204);

                done();
            });
        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .delete('/api/helpers/000000000000000000000000')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingHelper)
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.should.be.an.Object();
                res.body.should.have.property('message');
                res.body.message.should.match(/not found/);

                done();
            });
        });

    });

});


// ------------------------------------------------------
// AUXILIARY FUNCTIONS
// ------------------------------------------------------
function loadExistingHelper(done) {
    db.helpers
    .findOneAsync({})
    .then(function(helper) {
        if(!helper) {
            throw new Error('No helpers were find on the database.');
        }
        existingHelper = helper;
    })
    .finally(done);
}