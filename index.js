var decorator = require("./lib/eventDecorator.js");

module.exports = function(address, tasks){
  var eventMessager = require('../event-messager')(address);

  tasks.forEach(function(task){
    decorator(eventMessager, task);
  });
};
