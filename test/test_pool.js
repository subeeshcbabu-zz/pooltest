'use strict';

var test = require('tape');
var mockserver = require('./fixture/mockserver');
var fs = require('fs');
var path = require('path');
var Pool = require('../index').MyPool;

test('Test pool', function (t) {
    var server;

    function setup(callback) {
        server = mockserver.create();
        server.listen(callback);
    }

    function teardown(callback) {
        server.close();
        callback();
    }

    t.test('connection', function (t) {
        setup(function () {
            var pool = new Pool({
                port: server.address().port
            });

            pool.acquire(function (error, connection) {
                t.ok(!error, 'no error.');
                
                teardown(t.end);
            });
        });
    });

});
