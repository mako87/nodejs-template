/**
 * Created by Marco on 18/02/16.
 */

module.exports = function(express,indexRoute,tokenAuthRoute,tokenRefreshRoute,errorHandler,path,config){

    var bodyParser = require("body-parser");
    var expressJWT = require("express-jwt");
    var app = express();
    var param = config["jsonwebtoken"];
    var jwtRoute = expressJWT({secret:param["secret"]});

    //Setting app
    app.set("views", path.join(config["rootDir"], "views"));
    app.set("view engine", "hbs");

    //Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/public", express.static(path.join(config["rootDir"], "public")));
    app.use(errorHandler);

    app.use("/",indexRoute);
    app.use("/token-auth",tokenAuthRoute);
    app.use("/token-refresh",tokenRefreshRoute);
    app.all("*",function(req,res){res.redirect("/")});

    return require("http").createServer(app);

};

