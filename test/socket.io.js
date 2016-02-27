/**
 * Created by Marco on 25/02/16.
 */
var io = require("socket.io-client");
var config = require("../config/default.json");
var request = require("request");

var url = "http://localhost:"+config["webserver"]["port"];

describe("Socket.io",function(){

    describe("when the user is not logged in", function () {

        it("should emit error with unauthorized handshake", function (done){
            var socket = io.connect(url+"?token=boooooo", {
                "forceNew": true
            });

            socket.on("error", function(err){
                err.message.should.eql("jwt malformed");
                err.code.should.eql("invalid_token");
                socket.close();
                done();
            });
        });

    });

    describe("when the user is logged in", function() {

        before(function (done) {
            request.post({
                uri: url+"/auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                this.token = body.token;
                done();
            }.bind(this));
        });

        it("should do the handshake and connect", function (done){
            var socket = io.connect(url, {
                "forceNew":true,
                "query": "token=" + this.token
            });
            socket.on("connect", function(){
                socket.close();
                done();
            }).on("error", done);
        });
    });
});




