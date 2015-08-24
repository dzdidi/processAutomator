var mongoose = require('mongoose');

var taskRecord = require('./lib/taskRecord.js');
var taskDescription = require('./lib/taskDescription.js');
var taskExecutor = require('./lib/taskExecutor.js');
var options = require('./options.js');

mongoose.connect(options.uri, options.options);

module.exports = function(tasks){
  tasks.forEach(function(task){
    var tDescription = taskDescription.read(task);

    // get parameters for conditional function
    var cParameters = [];
    tDescription.conditionParams.forEach(function(cParam){
      var field = cParam['field'];
      var value = cParam['value'];
      var model = require('mongoose').model(cParam['model']);
      model.findOne({where: {field: value}}, function(err, data){
        cParameters.push(data);
      });
    });

    // get parametes task function
    var tParameters = [];
    tDescription.taskParams.forEach(function(tParam){
      var field = tParam['field'];
      var value = tParam['value'];
      var model = require('mongoose').model(tParam['model']);
      model.findOne({where: {field: value}}, function(err, data){
        tParameters.push(data);
      });
    });

    if(tDescription.condition(cParameters)){
      // unscheduled task
      if(tDescription.schedule.length === 0){ // instant one time task
        // run with parameters
        tDescription.task(tParameters);
        return; //return from current forEach iteration
      } else if (tDescription.schedule[0] === 0){ // instant multiple time task
        // run with parametes
        tDescription.task(tParameters);
        //calculate date of next run
        var tr = {
          name: task,
          next: new Date(Date.getFullYear(), Date.getMonth(), Date.getDay + td.schedule[1])
        };
        //record to db
        taskRecord.create(tr).then(console.log, console.log);
      } else { // not instant multiple time task
        //calculate date of next run
        var tr = {
          name: task,
          next: new Date(Date.getFullYear(), Date.getMonth(), Date.getDay + td.schedule[0])
        };
        //record to db
        taskRecord.create(tr).then(console.log, console.log);
      };
    };


    //logic for scheduled tasks
    taskRecord.find().then(function(taskRecords){
      taskRecords.forEach(function(taskRecord){
        // read task description
        var tDescription = taskDescription.read(taskRecord.name);

        // obtain task parameters
        var tParameters = [];
        tDescription.taskParams.forEach(function(tParam){
          var model = require('mongoose').model(tParam['model']);
          var field = tParam['field'];
          var value = tParam['value'];
          model.findOne({where: {field: value}}, function(err, data){
            tParameters.push(data);
          });
        });

        tDescription.task(tParameters);
        // change date of next task run and delete if it was the last one
        taskRecord.update(task.id);
      });
    }, function(err){
      console.log(err);
    });
  });
};
