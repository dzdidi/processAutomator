var sinon = require('sinon');
var assert = require('assert');
var path = require('path');
var taskDescription = require('../lib/taskDescription.js');

describe('taskDescription library', function(){
  describe('read function', function(){
    it('should have read function', function(){
      assert.equal(typeof taskDescription.read, 'function');
    });

    it('should return library by passed name', function(){
      assert.equal(taskDescription.read('testTask1'), require('../tasks/testTask1.js'));
    });
  });
});
