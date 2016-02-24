/**
 * Created by Marco on 18/02/16.
 */

module.exports = function(express,indexRoute,authRoute,errorHandler,path,config){

    var bodyParser = require("body-parser");
    var expressJWT = require("express-jwt");
    var app = express();

    //Setting app
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    //Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressJWT({secret:"pr1v4t3 k3y"}).unless({path: config["jsonwebtoken"]["unprotectedRoutes"]}));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(errorHandler);

    app.use("/",indexRoute);
    app.use("/auth",authRoute);

    return require("http").createServer(app);

};

