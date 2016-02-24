module.exports = function(config){

    var JSData = require('js-data');
    var DSRethinkDBAdapter = require('js-data-rethinkdb');

    var adapter = new DSRethinkDBAdapter(config['database']);
    var store = new JSData.DS({
        cacheResponse: false,
        bypassCache: true,
        keepChangeHistory: false,
        resetHistoryOnInject: false,
        upsert: false,
        notify: false,
        log: false
    });

    store.registerAdapter('rethinkdb', adapter, { "default": true });

    store.defineResource('user');

    return store;
};