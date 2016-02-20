'use strict';
var Connection = require('./connection');
var Pool = require('generic-pool').Pool;

function MyPool (options) {
    var self = this;

    options = options || {};

    this._pool = Pool({
        name     : 'mypool',
        create   : function (callback) {
            options.pool = self._pool;
            Connection.create(options, callback);
        },
        destroy  : function (connection) {
            connection._destroy();
        },
        validate: function (connection) {
            var valid = connection && connection._socket && !connection._socket.destroyed;
            return valid;
        },
        max      : options.max || 5,
        min      : options.min || 0,
        idleTimeoutMillis : options.idleTimeoutMillis  || 5000
    });
}

MyPool.prototype.acquire = function(callback) {

    this._pool.acquire(function (error, connection) {
        if (error) {
            callback(error);
            return;
        }
        callback(null, connection);
    });
}
module.exports.MyPool = MyPool;
