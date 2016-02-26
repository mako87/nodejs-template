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
        it("Find",function(done){
            var client = io.connect(socketURL,options);
            client.on("connect",function(){
                client.emit("ember-data",{cmd:"find",type:"user",params:"mgrassi"},done);
            });
            client.on("connect_error",done);
        });

        it("Create",function(done){
            var client = io.connect(socketURL,options);
            client.on("connect",function(){
                client.emit("ember-data",{cmd:"create",type:"user",params:{id:"mgrassi2",password:"test"}},done);
            });
            client.on("connect_error",done);
        });
    });
});

