<h1>This Task manager package based on event messaging system https://github.com/dzdidi/event-messager</h1>


To instantiate library require it and pass two parameters:
```javascript
var taskManager = require("task-manager")(<"address">, <["taskName1", ..., "taskNameN"]>);
```
Where address is string address of event listener to which this tasks will be assigned. And array of string names of tasks each of which is written in file `tasks/taskName[i].js` and has following structure:
 ```javascript
 module.exports = {
     //the event object which will be passed by task function
     taskObj: {
       name: "", // name of the listener to which this event object addressed
       address: "", // address of event messager (can be broadcast/multicast/unicast)
       dateToExecute: {}, // date when listener has to execute it's function (if undefined will be executed now)
       payload: {} // object with parameters for listener
     },

     // the object which will be passed by system if condition function is true
     conditionTrueObj: {
       name: "", // name of the listener to which this event object addressed
       address: "", // address of event messager (can be broadcast/multicast/unicast)
       dateToExecute: {}, // date when listener has to execute it's function (if undefined will be executed now)
       payload: {} // object with parameters for listener
     },

     // the object which will be passed by system if condition function is false
     conditionFalseObj: {
       name: "", // name of the listener to which this event object addressed
       address: "",// address of event messager (can be broadcast/multicast/unicast)
       dateToExecute: {}, // date when listener has to execute it's function (if undefined will be executed now)
       payload: {} // object with parameters for listener
     },

     // function which will check conditions for task to be executed or not. Should return boolean vaule
     condition: function(obj){
       return(obj.a === obj.b);
     },

     task: function(obj){
       console.log(a);
     }
   }
 };
 ```
 During instantiation library creates EventMessager instance with address provided as a parameter (broradcast, multicast address as well) and assigns each task as a listener to event with name of the task and condtion to event with `check` appended to task name.

 <h4>Exmaple</h4>
 ```
filename:  "task.js";
event:  "task";
condtionEvent: "checktask";
 ```

TODO:
 - include event-messager is not included as a dependancy
 - not tested
