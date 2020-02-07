const socket = require('socket.io');

var obj = {};

exports.socketServer = function (server) {
    const io = socket(server);

    io.on('connection', function (socket) {
        obj[socket.id] = new Date();
        console.log(obj);
        socket.emit("existing-users",Object.keys(obj));
        socket.broadcast.emit("connected-users",Object.keys(obj));
        socket.on('message', function (msg) {
            socket.broadcast.emit("message",{id:socket.id,msg});
        });

        socket.on("private-message", function (to,msg) {
            console.log(to,msg);
            if(obj.hasOwnProperty(to))
                socket.to(`${to}`).emit("private-message",{id: socket.id,msg});
            else
                socket.to(`${socket.id}`).emit("private-message",{msg:`${to} is offline`});
        });

        socket.on('disconnect', function(){
            delete obj[socket.id];
            console.log(obj);
        });
    });
};