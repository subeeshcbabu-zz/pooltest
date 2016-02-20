'use strict';
var net = require('net');

function Connection(socket, pool) {
    this._pool = pool;
    this._socket = socket;
}

module.exports.create = function create(config, callback) {

    var socket = net.connect(config);
    socket.unref();

    function removelisteners() {
        socket.removeAllListeners('connect');
        socket.removeAllListeners('error');
        socket.removeAllListeners('close');
        socket.removeAllListeners('timeout');
    };

    socket.once('connect', function(){

        callback(null, new Connection(socket, config.pool));

        socket.on('close', function () {
            removelisteners();
        });
    });

    socket.once('error', function (error) {
        callback(error);
        removelisteners();
    });

    socket.once('timeout', function () {
        callback(new Error('socket timeout'));
        removelisteners();
    });
}
