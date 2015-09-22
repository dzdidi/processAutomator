module.exports = function(eventMessager, taskName){
  var taskDescription = require('./taskDescription.js').read(taskName);

  eventMessager.addListener("check".concat(taskName), function(payload){
    if(taskDescription.condition(payload)){
      eventMessager.emmit(taskDescription.conditionTrueObj);
    } else {
      eventMessager.emmit(taskDescription.conditionFalseObj);
    };
  });

  eventMessager.addListener(taskName, function(payload){
    taskDescription.task(payload);
    eventMessager.emmit(taskDescription.taskObj);
  });
};
