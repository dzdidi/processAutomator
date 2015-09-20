var fs = require('fs');
var path = require('path');

module.exports = {
  read: function(name, address){
    return require(path.join(__dirname, '../tasks/' + name + '.js')(address, name));
  }
}
