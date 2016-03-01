/**
 * Created by Marco on 19/02/16.
 */
module.exports = function(app,store,logger,config) {
    var io = require("socket.io")(app);
    var socketioJwt = require("socketio-jwt");
    var secret = config["jsonwebtoken"]["secret"];

    io.use(socketioJwt.authorize({
        secret: secret,
        handshake: true
    }));

    io.on("connection",function(socket){
        logger.info("Client connected");
        socket.on("ember-data",function(d,fn){
            store[d.cmd](d.type,d.params).then(function(r){
                return fn(null,r);
            }).catch(function(e){
                logger.info(e);
                return fn(e);
            });
        });

        socket.on("message",function(d){
            logger.info(d);
        })
    });

    return io;
};