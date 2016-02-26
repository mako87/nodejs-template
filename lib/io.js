/**
 * Created by Marco on 19/02/16.
 */
module.exports = function(app,store,logger,config) {
    var io = require("socket.io")(app);
    var socketioJwt = require("socketio-jwt");
    var param = config["jsonwebtoken"];

    io.use(socketioJwt.authorize({
        secret: param["secret"],
        handshake: true
    }));

    io.on("connection",function(socket){
        socket.on("ember-data",function(d,fn){
            store[d.cmd](d.type,d.params).then(function(r){
                return fn(null,r);
            }).catch(function(e){
                logger.info(e);
                return fn(e);
            });
        });
    });

    return io;
};