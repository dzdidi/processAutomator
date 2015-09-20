var ADDRESS = "Task:Maganer";
var taskDescription = require('./lib/taskDescription.js');

module.exports = function(tasks){
  var eventMessager = require('../event-messager')(ADDRESS);

  tasks.forEach(function(task){
    //listener for check conditions
    eventMessager.addListener("check".concat(task), taskDescription.read(ADDRESS, task).condition);
    //listener for task
    eventMessager.addListener(task, taskDescription.read(ADDRESS, task).task);
  });
};
