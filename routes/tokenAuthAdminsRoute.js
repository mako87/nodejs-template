module.exports = function(express,jwt,config,store,logger,bcrypt){
    var router =  new express.Router();
    var secret = config["jsonwebtoken"]["secret"]+' admins secret';

    router.post("/", function(req,res){

        if (!req.body.username) {return res.status(400).send("username required");}
        if (!req.body.password) {return res.status(400).send("password required");}

        store.find("user",req.body.username).then(function(r){

            store.find("profile",r["profile"]).then(function(p){

                if (bcrypt.compareSync(req.body.password, r["password"]) && p['admins']) {
                    return res.status(200).send({
                        token: jwt.sign({user: r}, secret, {expiresIn: config["jsonwebtoken"]["expiresIn"]}),
                        user: r
                    });
                } else {
                    return res.status(401).send("invalid credentials");
                }

            }).catch(function(e){
                console.log(e.stack);
                logger.info(e+" ["+req.body.username+"]");
                return res.status(401).send("invalid credentials");
            });


        }).catch(function(e){
            console.log(e.stack);
            logger.info(e+" ["+req.body.username+"]");
            return res.status(401).send("invalid credentials");
        });
    });

    return router;
};