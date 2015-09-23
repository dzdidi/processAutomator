var sinon = require('sinon');
var assert = require('assert');
var taskRecord = require('../lib/taskRecord.js');
var mongoose = require('mongoose');

describe('taskRecord library', function(){
  it('should declare mongoose schema', function(){
    var spy = sinon.spy(mongoose, 'Schema');
    taskRecord.read();

    assert.equal(spy.called, true);
    spy.restore();
  });

  describe('create function', function(){
    it('should have create function', function(){
      assert.equal(typeof taskRecord.create, 'function');
    });


  });

  describe('read function', function(){
    it('should have read function', function(){
      assert.equal(typeof taskRecord.read, 'function');
    });
  });

  describe('update function', function(){
    it('should have update function', function(){
      assert.equal(typeof taskRecord.update, 'function');
    });
  });
});
