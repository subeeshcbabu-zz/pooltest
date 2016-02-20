'use string';
var net = require('net');

module.exports.create = function () {

    return net.createServer(function (socket){
        
        socket.on('error', function (error) {
            console.error(error.stack);
        });
    })

}
