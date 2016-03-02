/**
 * Created by Marco on 02/03/16.
 */
module.exports = function(store){

    return {

        find: function(d,fn) {
            store.find(d.model,d.id).then(fn).catch(fn);
        },

        findAll: function(d,fn) {
            store.findAll(d.model,d.params).then(fn).catch(fn);
        },

        create: function(d,fn) {
            store.create(d.model,d.attr).then(fn).catch(fn);
        },

        update: function(d,fn) {
            store.update(d.model,d.id,d.attr).then(fn).catch(fn);
        },

        updateAll: function(d,fn) {
            store.updateAll(d.model,d.params,d.attr).then(fn).catch(fn);
        },

        destroy: function(d,fn) {
            store.destroy(d.model,d.id).then(fn).catch(fn);
        },

        destroyAll: function(d,fn) {
            store.destroyAll(d.model,d.params).then(fn).catch(fn);
        }
    };
};