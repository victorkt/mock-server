'use strict';

require('../test-helper');

var request = require('supertest'),
    should = require('should'),
    app = require('../../../server'),
    db = require('../../../initializers/database'),
    MockFixture = require('../fixtures/mock');

var existingMock;


describe('Mocks Controller', function() {

    // connects to DB
    before(function(done) {
        db.connect().finally(done);
    });

    // resets the database
    beforeEach(function(done) {
        db.mocks
        .removeAsync({})
        .then(function() {
            return db
            .mocks
            .insertAsync(MockFixture.data);
        })
        .finally(done);
    });

    describe('GET /mocks', function() {

        it('lists all mocks on database', function(done) {
            request(app)
            .get('/api/mocks')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                res.body.length.should.equal(MockFixture.data.length);

                done();
            });
        });

        describe('attributes', function() {

            var response;
            before(function(done) {
                request(app)
                .get('/api/mocks')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response = res.body;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                response.forEach(function(mock) {
                    mock._id.should.be.a.String();
                });
                done();
            });
            
            it('returns the path', function(done) {
                response.forEach(function(mock) {
                    mock.path.should.be.a.String();
                });
                done();
            });
            
            it('returns the method', function(done) {
                response.forEach(function(mock) {
                    mock.method.should.be.a.String();
                });
                done();
            });
            
            it('returns the status', function(done) {
                response.forEach(function(mock) {
                    mock.status.should.be.a.Number();
                });
                done();
            });
            
            it('returns the headers', function(done) {
                response.forEach(function(mock) {
                    mock.headers.should.be.an.Array();
                    mock.headers.forEach(function(header) {
                        header.should.be.a.String();
                    });
                });
                done();
            });
            
            it('returns the template', function(done) {
                response.forEach(function(mock) {
                    mock.template.should.be.a.String();
                });
                done();
            });

        });

    });

    describe('POST /mocks', function() {

        it('creates a new mock', function(done) {
            request(app)
            .post('/api/mocks')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(MockFixture.valid)
            .end(function(err, res) {
                res.status.should.equal(201);
                res.body.should.have.property('_id');

                done();
            });
        });

        describe('unique keys', function() {

            var mock = MockFixture.valid;
            mock.method = 'POST';

            function sendMock(m) {
                return request(app)
                .post('/api/mocks')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(m);
            }

            it('allows the same path for several methods', function(done) {
                sendMock(mock)
                .end(function(err, res) {
                    res.status.should.equal(201);
                    res.body.should.have.property('_id');

                    done();
                });
            });

            it('does not allow the same path and method', function(done) {
                sendMock(mock)
                .end(function(err, res) {
                    sendMock(mock)
                    .end(function(err1, res1) {
                        res1.status.should.equal(400);
                        res1.body.should.not.have.property('_id');

                        done();
                    });
                });
            });

        });

    });

    describe('GET /mocks/:id', function() {

        beforeEach(loadExistingMock);

        it('shows details about a given mock', function(done) {
            request(app)
            .get('/api/mocks/' + existingMock._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Object();

                done();
            });
        });

        describe('attributes', function() {

            var mock;
            beforeEach(function(done) {
                request(app)
                .get('/api/mocks/' + existingMock._id)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    mock = res.body;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                mock.should.have.property('_id');
                mock._id.should.be.a.String();
                mock._id.should.equal(existingMock._id.toString());
                done();
            });
            
            it('returns the path', function(done) {
                mock.path.should.be.a.String();
                done();
            });
            
            it('returns the method', function(done) {
                mock.method.should.be.a.String();
                done();
            });
            
            it('returns the status', function(done) {
                mock.status.should.be.a.Number();
                done();
            });
            
            it('returns the headers', function(done) {
                mock.headers.should.be.an.Array();
                mock.headers.forEach(function(header) {
                    header.should.be.a.String();
                });
                done();
            });
            
            it('returns the template', function(done) {
                mock.template.should.be.a.String();
                done();
            });

        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .get('/api/mocks/000000000000000000000000')
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

    describe('PATCH /mocks/:id', function() {

        beforeEach(loadExistingMock);

        it('should update a mock', function(done) {
            existingMock.status++;

            request(app)
            .patch('/api/mocks/' + existingMock._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingMock)
            .end(function(err, res) {
                res.status.should.equal(202);
                res.body.should.have.property('status');
                res.body.status.should.equal(existingMock.status);

                done();
            });
        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .patch('/api/mocks/000000000000000000000000')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingMock)
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.should.be.an.Object();
                res.body.should.have.property('message');
                res.body.message.should.match(/not found/);

                done();
            });
        });

    });

    describe('DELETE /mocks/:id', function() {

        beforeEach(loadExistingMock);

        it('should delete a mock', function(done) {
            request(app)
            .delete('/api/mocks/' + existingMock._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(204);

                done();
            });
        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .delete('/api/mocks/000000000000000000000000')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingMock)
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
function loadExistingMock(done) {
    db.mocks
    .findOneAsync({})
    .then(function(mock) {
        if(!mock) {
            throw new Error('No mocks were find on the database.');
        }
        existingMock = mock;
    })
    .finally(done);
}