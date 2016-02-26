var should = require("should");
var request = require("request");
var config = require("../config/default.json");

var url = "http://localhost:"+config["webserver"]["port"]+"/auth";

var options = {
    method: "POST",
    url: url,
    json: true
};

describe("Authentication API",function(){

    describe("when credentials is correct",function(){
        it("should response status 200",function(done){
            options["body"]={username:"admin",password:"admin"};
            request(options, function(error,response){
                should.not.exist(error);
                response.statusCode.should.equal(200);
                done();
            });
        });
    });

    describe("when credentials is incorrect",function(){
        it("should response status 401",function(done){
            options["body"]={username:"wrong",password:"wrong"};
            request(options, function(error,response){
                should.not.exist(error);
                should.equal(response.statusCode,401);
                done();
            });
        });
    });

    describe("when missing credentials",function() {
        it("should response status code 401", function (done) {
            options["body"]={};
            request(options, function (error, response) {
                should.not.exist(error);
                should.equal(response.statusCode,400);
                done();
            });
        });
    });

    describe("when access to protected area without token authorization",function() {
        it("should response status code 401", function (done) {
            request({
                method: "GET",
                uri: "http://localhost:" + config["webserver"]["port"]
            }, function (error, response) {
                should.not.exist(error);
                should.equal(response.statusCode,401);
                done();
            });
        });
    });

    describe("when access to protected area with token authorization",function() {

        before(function (done) {
            request.post({
                uri: url,
                body: { username: "admin", password: "admin" },
                json: true
            }, function (err, resp, body) {
                this.token = body;
                done();
            }.bind(this));
        });

        it("should response status code 200", function (done) {
            request({
                method: "GET",
                url: "http://localhost:" + config["webserver"]["port"],
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }, function (error, response) {
                should.not.exist(error);
                should.equal(response.statusCode,200);
                done();
            });
        });
    });
});
