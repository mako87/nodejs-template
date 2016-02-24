module.exports = function(express,logger){
    var router = express.Router();
    router.get('/', function(req,res){
        res.sendStatus(200);
    });
    return router;
};