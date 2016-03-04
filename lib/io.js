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

        socket.on("ember-request", function(req,fn){

            store[req.cmd].apply(store,req.params).then(function(d) {
                console.log(d);
                fn(null,d);
            }).catch(function(e){
                logger.error(e.message);
                fn(e.message.split(':')[0],null);
            });

        });

    });

    return io;
};