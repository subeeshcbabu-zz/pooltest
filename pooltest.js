var Pool = require('generic-pool').Pool;


var mypool = Pool({
    name     : 'mypool',
    create   : function (callback) {
        callback(null, {
            id: Math.random(),
            details: 'This is a connection'
        });
    },
    destroy  : function (connection) {
        console.log("Destroyed");
    },
    max      : 1,
    min      : 0,
    idleTimeoutMillis : 5000
});

console.log("acquiring connection");

mypool.acquire(function(error, connection){

    if (error) {
        console.error(error);
    }
    console.log('Got connection', connection);

    mypool.acquire(function(error, connection2){

        if (error) {
            console.error(error);
        }
        console.log('Got connection2', connection2);
    });
});
