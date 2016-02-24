/**
 * Created by Marco on 19/02/16.
 */

var container = require("../container");

container.register("start",function(io,app,config){
    container.get("app").listen(config["webserver"].port);
});

container.get("start");