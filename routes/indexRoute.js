module.exports = function(express){
    var router = express["Router"]();
    router.get("/", function(req,res){
        res.sendStatus(200);
    });
    return router;
};