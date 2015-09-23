var fs = require('fs');
var path = require('path');

module.exports = {
  read: function(taskName){
    return require(path.join(__dirname, '../tasks/' + taskName + '.js'));
  }
}
