var wrapper = require("./lib/wrapper.js");

module.exports = function(address, tasks){
  var eventMessager = require('../event-messager')(address);

  tasks.forEach(function(task){
    wrapper(eventMessager, task);
  });
};
