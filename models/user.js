module.exports = function (bcrypt) {

    return {
        name: "user",
        table: "user",

        beforeCreate(hash) {
            return new global.Promise(function(resolve){
                if (hash.password) {
                    hash.password = bcrypt.hashSync(hash.password,8);
                }
                resolve(hash)
            });
        },

        beforeUpdate(hash) {
            return new global.Promise(function(resolve){
                if (hash.password) {
                    hash.password = bcrypt.hashSync(hash.password,8);
                }
                resolve(hash)
            });
        }
    };
};