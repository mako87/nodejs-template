module.exports = function (bcrypt) {
    return {
        name: "user",
        table: "user",

        beforeCreate(User, user, cb) {
            user.createdAt = new Date();
            user.updatedAt = new Date();
            user.password = bcrypt.hashSync(user.password,8);
            return cb(null, user);
        },

        beforeUpdate(User, user, cb) {
            user.updatedAt = new Date();
            return cb(null, user);
        }
    };
};