module.exports = function (bcrypt) {

    return {
        name: "user",
        table: "user",

        beforeCreate(User, user, cb) {
            if (user.password) {
                user.password = bcrypt.hashSync(user.password,8);
            }
            return cb(null, user);
        },

        beforeUpdate(User, user, cb) {
            if (user.password) {
                user.password = bcrypt.hashSync(user.password,8);
            }
            return cb(null, user);
        },

        afterFind(User, user, cb){
            return cb(null,{user: user});
        },

        afterFindAll(User, users, cb){
            return cb(null,{users:users});
        }
    };
};