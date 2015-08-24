var teskDescription = require('./taskDescription.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var schema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    name: String,
    next: Date,
    number: {
      type: Number,
      default: 1
    }
});
var taskRecordModel = mongoose.model("TaskRecord", schema);

module.exports = {
  create: function(taskRecord){
    return new Promise(function(resolve, reject){
      taskRecordModel.create(taskRecord, function(err, tr){
        if(err) reject(err);
        resolve(tr);
      });
    });
  },

  read: function(){
    return new Promise(function(resolve, reject){
      date = new Date(Date.now());
      d = date.getDay();
      m = date.getMonth();
      y = date.getFullYear();

      taskRecordModel.find({where: {next: {$gt: new Date(y, m, d), $lt: new Date(y, m, d + 1)}}}, function(err, data){
        if(err) reject(err);
        resolve(data);
      });
    });
  },

  update: function(id){
    return new Promise(function(resolve, reject){
      taskRecordModel.findOne({_id: id}, function(err, taskRecord){
        var schedule = taskDescription.read(taskRecord.name).schedule;

        if(taskRecord.number < schedule.length){
          taskRecord.next = new Date(Date.getFullYear(), Date.getMonth(), Date.getDay() + schedule[taskRecord.number]);
          taskRecord.number += 1;

          taskRecord.save(function(err, data){
            if(err) reject(err);
            resolve(data);
          });
        } else {
          taskRecord.remove(function(err, data){
            if(err) reject(err);
            resolve(data);
          });
        };
      });
    });
  }
}
