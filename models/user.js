module.exports = function (bcrypt) {
    return {
        name: "user",
        table: "user",

        beforeCreate(User, user, cb) {
            user.createdAt = new Date();
            if (user.password) {
                user.password = bcrypt.hashSync(user.password,8);
            }
            return cb(null, user);
        },

        beforeUpdate(User, user, cb) {
            user.updatedAt = new Date();
            console.log(user.password);
            if (user.password) {
                user.password = bcrypt.hashSync(user.password,8);
            }
            console.log(user.password);
            return cb(null, user);
        }
    };
};