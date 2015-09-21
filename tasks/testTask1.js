module.exports = {
    //the object which should be passed by task function
    taskObj: {
      name: "",//tdb
      address: "",//tdb
      dateToExecute: {},//tbd
      payload: {} //tbd
    },
    // the object which should be passed by condition function is true
    conditionTrueObj: {
      name: "",//tbd
      address: "",//tbd
      dateToExecute: {},//tbd
      payload: {}//tbd
    },
    // the object which should be passed by condition function is false
    conditionFalseObj: {
      name: "",//tbd
      address: "",//tbd
      dateToExecute: {},//tbd
      payload: {}//tbd
    },

    condition: function(obj){
      return(obj.a === obj.b);
    },

    task: function(a){
      console.log(a);
    }
  }
};
