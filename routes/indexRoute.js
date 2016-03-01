module.exports = function(express){
    var router = new express.Router();
    router.get("/", function(req,res){
        res.sendStatus(200);
    });
    router.get("/authorize",function(req,res){
        res.sendStatus(200);
    });
    return router;
};