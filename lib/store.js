module.exports = function(container,config){


    var JSData = require("js-data");
    var DSRethinkDBAdapter = require("js-data-rethinkdb");

    var adapter = new DSRethinkDBAdapter(config["database"]);
    var store = new JSData.DataStore({
        cacheResponse: false,
        bypassCache: true,
        keepChangeHistory: false,
        resetHistoryOnInject: false,
        upsert: false,
        notify: false,
        log: false
    });

    store.registerAdapter("rethinkdb", adapter, { "default": true });

    config["models"].forEach(function(m){
        store.defineMapper(m,container.get(m));
    });

    return store;
};