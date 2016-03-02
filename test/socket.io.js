/**
 * Created by Marco on 25/02/16.
 */
var io = require("socket.io-client");
var config = require("../config/default.json");
var request = require("request");
var should = require("should");

var url = "http://localhost:"+config["webserver"]["port"];

describe("Socket.io",function(){

    describe("when is authenticated", function () {

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

    describe("when is not authenticated", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
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

    describe("when emit ember-data FIND", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("find",{
                cmd: "find",
                model: "user",
                id: "admin"
            },function(r){
                should.equal(r.id,"admin");
                done();
            });
        });
    });

    describe("when emit ember-data FIND ALL", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("findAll",{
                cmd: "findAll",
                model: "user",
                params: {}
            },function(r){
                r.length.should.be.above(0);
                done();
            });
        });
    });

    describe("when emit ember-data CREATE", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("create",{
                cmd: "create",
                model: "user",
                attr: {id:"admin3",password:"admin3",username:"admin3"}
            },function(r){
                console.log(r);
                done();
            });
        });
    });

    describe("when emit ember-data UPDATE", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("update",{
                cmd: "update",
                model: "user",
                id: "admin2",
                attr: {password:"admin2"}
            },function(r){
                console.log(r);
                done();
            });
        });
    });

    describe("when emit ember-data UPDATE ALL", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("updateAll",{
                cmd: "updateAll",
                model: "user",
                params: {username:"admin2"},
                attr: {password:"admin2"}
            },function(r){
                console.log(r);
                done();
            });
        });
    });

    describe("when emit ember-data DESTROY", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("destroy",{
                cmd: "destroy",
                model: "user",
                id: "admin2"
            },function(r){
                console.log(r);
                done();
            });
        });
    });

    describe("when emit ember-data DESTROY ALL", function() {

        before(function (done) {
            request.post({
                uri: url+"/token-auth",
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                var socket = io.connect(url, {
                    "forceNew":true,
                    "query": "token=" + body.token
                });
                socket.on("connect", function(){
                    done();
                }).on("error", done);

                this.socket = socket;

            }.bind(this));
        });

        it("should retrieve data", function (done){
            this.socket.emit("destroyAll",{
                cmd: "destroyAll",
                model: "user",
                params: {username: "admin2"}
            },function(r){
                console.log(r);
                done();
            });
        });
    });
});




