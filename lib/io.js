/**
 * Created by Marco on 19/02/16.
 */
module.exports = function(app,store,logger,config,adapter) {

    var io = require("socket.io")(app);
    var socketioJwt = require("socketio-jwt");
    var secret = config["jsonwebtoken"]["secret"];

    io.use(socketioJwt.authorize({
        secret: secret,
        handshake: true
    }));

    io.on("connection",function(socket){

        socket.on("find",adapter.find);

        socket.on("findAll",adapter.findAll);

        socket.on("create",adapter.create);

        socket.on("update",adapter.update);

        socket.on("updateAll",adapter.updateAll);

        socket.on("destroy",adapter.destroy);

        socket.on("destroyAll",adapter.destroyAll);

    });

    return io;
};