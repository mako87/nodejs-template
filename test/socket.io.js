/**
 * Created by Marco on 25/02/16.
 */
var io = require("socket.io-client");
var config = require("../config/default.json");

var socketURL = "http://0.0.0.0:"+config["webserver"]["port"];

var options ={
    transports: ["websocket"],
    "force new connection": true
};

describe("Socket.io",function(){
    describe("Message ember-data",function(){

        it("Create if no find the user admin",function(done){
            var client = io.connect(socketURL,options);
            client.on("connect",function(){
                client.emit("ember-data",{cmd:"find",type:"user",params:"admin"},function(err,user){
                    if (err) client.emit("ember-data",{cmd:"create",type:"user",params:{id:"admin",password:"admin"}},done);
                    else done();
                });
            });
            client.on("connect_error",done);
        });
    });
});

