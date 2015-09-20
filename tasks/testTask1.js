module.exports = function(address, taskName){
  var eventMessager = require('../../event-messager')(taskName);
  var taskObj = {
    name: taskName,
    address: address,
    payload: {}
  }

  var conditionObj = {
    name: "check".concat(taskName);
    address: address,
    payload: {}
  }

  return{
    condition: function(obj){
      if(obj.a === obj.b){
        eventMessager.emit(taskName);
      } else{
        console.log("Sorry, conditions for task %s are false", taskName);
      }
    },

    task: function(a){
      console.log(a);
    }
  }
};
