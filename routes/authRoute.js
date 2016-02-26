module.exports = function(express,jwt,config,store,logger,bcrypt){
    var router =  new express.Router();

    router.post("/", function(req,res){
        if (!req.body.username) {return res.status(400).send("username required");}
        if (!req.body.password) {return res.status(400).send("password required");}

        store.find("user",req.body.username).then(function(r){
            if (bcrypt.compareSync(req.body.password, r["password"])) {
                return res.status(200).json(jwt.sign({username:req.body.username},"pr1v4t3 k3y",{expiresTokenIn:config["jsonwebtoken"]["expiresTokenIn"]}));
            } else {
                return res.status(400).send("invalid credentials");
            }
        }).catch(function(e){
            logger.info(e+" ["+req.body.username+"]");
            return res.status(400).send("invalid credentials");
        });
    });

    return router;
};