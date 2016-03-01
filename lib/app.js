/**
 * Created by Marco on 18/02/16.
 */

module.exports = function(express,indexRoute,tokenAuthRoute,tokenRefreshRoute,errorHandler,path,config){

    var bodyParser = require("body-parser");
    var expressJWT = require("express-jwt");
    var app = express();
    var param = config["jsonwebtoken"];

    //Setting app
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    //Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressJWT({secret:param["secret"]}).unless({path: param["unprotectedRoutes"]}));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(errorHandler);

    app.use("/",indexRoute);
    app.use("/token-auth",tokenAuthRoute);
    app.use("/token-refresh",tokenRefreshRoute);

    return require("http").createServer(app);

};

