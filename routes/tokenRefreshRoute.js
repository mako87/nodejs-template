module.exports = function(express,jwt,config){
    var router =  new express.Router();
    var secret = config["jsonwebtoken"]["secret"];

    router.post("/", function(req,res){

        if (!req.body.token) {res.status(400).send("bad request");}

        jwt.verify(req.body.token, secret ,function(err,decode){
            if (err) {res.status(401).send("failed to decode token")}
            else {
                var token_refresh = jwt.sign({user: decode.user}, secret, {expiresIn: config["jsonwebtoken"]["expiresIn"]});
                res.status(200).send({token:token_refresh,user:decode.user});
            }
        });
    });

    return router;
};