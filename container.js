var dependable = require('dependable');
var container = dependable.container();

// Load and register app config
container.register('config',function(path){
    return require(path.join(__dirname, './config/default.json'))
});

container.register('express',function(){
    return require('express');
});

container.register('jwt',function(){
    return require('jsonwebtoken');
});

container.register('logger',function(){
   return require('winston');
});

container.register('moment',function(){
    return require('moment');
});

container.register('path',function(){
    return require('path');
});

container.register('bcrypt',function(){
   return require('bcrypt') ;
});

container.load(container.get('path').join(__dirname, './routes'));

container.load(container.get('path').join(__dirname, './lib'));

// Register the container with the container, useful for when you need dynamically resolve a dependency or avoid a circular dependency
container.register('container', function () {
    return container;
});

module.exports = container;