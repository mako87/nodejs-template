module.exports = function (bcrypt) {
    return {
        name: "user",
        table: "user",

        beforeCreate: function (User, user, cb) {
            user.created_at = new Date();
            user.updated_at = new Date();
            user.password = bcrypt.hashSync(user.password,8);
            return cb(null, user);
        },

        beforeUpdate: function (User, user, cb) {
            user.updated_at = new Date();
            return cb(null, user);
        }
    };
};