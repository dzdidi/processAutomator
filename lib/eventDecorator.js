module.exports = function(eventMessager, taskName){
  var taskDescription = require('./taskDescription.js').read(taskName);

  eventMessager.addListener("check".concat(taskName), function(payload){
    if(taskDescription.condition(payload)){
      eventMessager.publish(taskDescription.conditionTrueObj);
    } else {
      eventMessager.publish(taskDescription.conditionFalseObj);
    };
  });

  eventMessager.addListener(taskName, function(payload){
    taskDescription.task(payload);
    eventMessager.publish(taskDescription.taskObj);
  });
};
