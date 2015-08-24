// both condition and task functions accepts one parameter which is array

module.exports = {
  name: 'testTask1',
  schedule: ['Delay in days for first execution', '...', 'Delay in days for n-th execution after n-1 -th'],
  conditionParams: [
    {'model':'modelName', 'feild':'feildName', 'value': 'value'},
    {'model':'modelName', 'feild':'feildName', 'value': 'value'}
  ],
  condition: function(a){ // should also include logic to check is task scheduled
    return true;
  },
  taskParams: {
    {'model':'modelName', 'feild':'feildName', 'value': 'value'},
    {'model':'modelName', 'feild':'feildName', 'value': 'value'}
  },
  task: function(a){ //should include logic to state that task is scheduled
    console.log(a);
  }
};
