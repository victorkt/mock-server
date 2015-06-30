'use strict';

require('../test-helper');

var request = require('supertest'),
    should = require('should'),
    app = require('../../../server'),
    db = require('../../../initializers/database'),
    LogFixture = require('../fixtures/log');

var existingLog;


describe('Logs Controller', function() {

    // connects to DB
    before(function(done) {
        db.connect().finally(done);
    });

    // resets the database
    beforeEach(function(done) {
        db.logs
        .removeAsync({})
        .then(function() {
            return db
            .logs
            .insertAsync(LogFixture.data);
        })
        .finally(done);
    });

    describe('GET /logs', function() {

        it('lists all logs on database', function(done) {
            request(app)
            .get('/api/logs')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('logs');
                res.body.logs.should.be.an.Array();

                done();
            });
        });

        describe('pagination & ordering attributes', function() {

            var response;
            before(function(done) {
                request(app)
                .get('/api/logs')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response = res.body;
                    done();
                });
            });

            it('displays the amount of items being returned per page', function(done) {
                request(app)
                .get('/api/logs')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response.should.have.property('perPage');
                    response.perPage.should.be.a.Number();

                    done();
                });
            });

            it('displays the total amount of log items in the database', function(done) {
                request(app)
                .get('/api/logs')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response.should.have.property('total');
                    response.total.should.be.an.Number();

                    done();
                });
            });

            it('displays the sorting parameters', function(done) {
                request(app)
                .get('/api/logs')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    response.should.have.property('sort');
                    response.sort.should.be.an.Object();

                    done();
                });
            });

        });

        describe('logs attributes', function() {

            var logs;
            before(function(done) {
                request(app)
                .get('/api/logs')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    logs = res.body.logs;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                logs.forEach(function(log) {
                    log._id.should.be.a.String();
                });
                done();
            });
            
            it('returns the mock', function(done) {
                logs.forEach(function(log) {
                    log.mock.should.be.a.String();
                });
                done();
            });
            
            it('returns the path', function(done) {
                logs.forEach(function(log) {
                    log.path.should.be.a.String();
                });
                done();
            });
            
            it('returns the date', function(done) {
                logs.forEach(function(log) {
                    log.date.should.be.a.String();
                    log.date.should.match(/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
                });
                done();
            });
            
            it('returns the request method', function(done) {
                logs.forEach(function(log) {
                    log.request.method.should.be.a.String();
                });
                done();
            });
            
            it('returns the request full URL', function(done) {
                logs.forEach(function(log) {
                    log.request.url.should.be.a.String();
                });
                done();
            });
            
            it('returns the response status', function(done) {
                logs.forEach(function(log) {
                    log.response.status.should.be.a.Number();
                });
                done();
            });
            
            it('returns the response time', function(done) {
                logs.forEach(function(log) {
                    log.response.time.should.be.a.Number();
                });
                done();
            });

        });

        describe('pagination & ordering', function() {

            it('limits the amount of results', function(done) {
                request(app)
                .get('/api/logs?limit=1')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    res.body.logs.length.should.equal(1);
                    res.body.perPage.should.equal(1);
                    done(err);
                });
            });

            it('paginates the results', function(done) {
                request(app)
                .get('/api/logs?limit=1')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    request(app)
                    .get('/api/logs?limit=1&page=2')
                    .set('Accept', 'application/json')
                    .end(function(err1, res1) {
                        var logFirstPage = res.body.logs[0],
                            logSecondPage = res1.body.logs[0];

                        logFirstPage._id.should.not.equal(logSecondPage._id);
                        done();
                    });
                });
            });

            it('sorts the results in ascending order', function(done) {
                request(app)
                .get('/api/logs?sort=_id')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    var ids = res.body.logs.map(function(log) {
                        return log._id;
                    }).sort();

                    res.body.logs.forEach(function(log, idx) {
                        log._id.should.equal(ids[idx]);
                    });
                    
                    done(err);
                });
            });

            it('sorts the results in descending order', function(done) {
                request(app)
                .get('/api/logs?sort=-_id')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    var ids = res.body.logs.map(function(log) {
                        return log._id;
                    }).sort().reverse();

                    res.body.logs.forEach(function(log, idx) {
                        log._id.should.equal(ids[idx]);
                    });

                    done(err);
                });
            });

        });

    });

    describe('GET /logs/:id', function() {

        beforeEach(loadExistingLog);

        it('shows details about a given log', function(done) {
            request(app)
            .get('/api/logs/' + existingLog._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Object();

                done();
            });
        });

        describe('attributes', function() {

            var log;
            beforeEach(function(done) {
                request(app)
                .get('/api/logs/' + existingLog._id)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    log = res.body;
                    done(err);
                });
            });
            
            it('returns the _id', function(done) {
                log.should.have.property('_id');
                log._id.should.be.a.String();
                log._id.should.equal(existingLog._id.toString());
                done();
            });
            
            it('returns the mock', function(done) {
                log.mock.should.be.a.String();
                done();
            });
            
            it('returns the path', function(done) {
                log.path.should.be.a.String();
                done();
            });
            
            it('returns the date', function(done) {
                log.date.should.be.a.String();
                log.date.should.match(/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
                done();
            });
            
            it('returns the request method', function(done) {
                log.request.method.should.be.a.String();
                done();
            });
            
            it('returns the request full URL', function(done) {
                log.request.url.should.be.a.String();
                done();
            });
            
            it('returns the request headers', function(done) {
                log.request.headers.should.be.a.Object();
                done();
            });
            
            it('returns the request body', function(done) {
                log.request.body.should.be.a.Object();
                done();
            });
            
            it('returns the response status', function(done) {
                log.response.status.should.be.a.Number();
                done();
            });
            
            it('returns the response time', function(done) {
                log.response.time.should.be.a.Number();
                done();
            });
            
            it('returns the response headers', function(done) {
                log.response.headers.should.be.an.Object();
                done();
            });

        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .get('/api/logs/000000000000000000000000')
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

    describe('DELETE /logs/:id', function() {

        beforeEach(loadExistingLog);

        it('should delete a log', function(done) {
            request(app)
            .delete('/api/logs/' + existingLog._id)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                res.status.should.equal(204);

                done();
            });
        });

        it('returns 404 when the ID does not exist', function(done) {
            request(app)
            .delete('/api/logs/000000000000000000000000')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(existingLog)
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
function loadExistingLog(done) {
    db.logs
    .findOneAsync({})
    .then(function(log) {
        if(!log) {
            throw new Error('No logs were find on the database.');
        }
        existingLog = log;
    })
    .finally(done);
}