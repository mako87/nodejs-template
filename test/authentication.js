var should = require("should");
var request = require("request");
var config = require("../config/default.json");

var options = {
    method: "POST",
    uri: "http://localhost:"+config["webserver"]["port"]+"/auth",
    json: true
};

describe("Authentication",function(){
    it("Correct credentials",function(){
        options["body"]={username:"admin",password:"admin"};
        request(options, function(error,response){
            response.statusCode.should.equal(200);
        });
    });

    it("Incorrect credentials",function(){
        options["body"]={username:"wrong",password:"wrong"};
        request(options, function(error,response){
            response.statusCode.should.equal(401);
        });
    });

    it("Only incorrect password",function(){
        options["body"]={username:"admin",password:"wrong"};
        request(options, function(error,response){
            response.statusCode.should.equal(401);
        });
    });

    it("Access to protected area without token",function(){
        request({method:"GET",uri:"http://localhost:"+config["webserver"]["port"]},function(error,response){
            response.statusCode.should.equal(401);
        });
    });

    it("Access to protected area with token",function(){
        options["body"]={username:"admin",password:"admin"};
        request(options, function(error,response,body){
            request({
                method: "GET",
                uri: "http://localhost:"+config["webserver"]["port"],
                headers: {
                    Authorization: "Bearer "+body
                }
            }, function (error, response) {
                response.statusCode.should.equal(200);
            });
        });

    });
});
