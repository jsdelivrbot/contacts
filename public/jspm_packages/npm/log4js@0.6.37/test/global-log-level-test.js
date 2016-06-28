/* */ 
"use strict";
var vows = require('vows'),
    assert = require('assert');
vows.describe('log4js global loglevel').addBatch({'global loglevel': {
    topic: function() {
      var log4js = require('../lib/log4js');
      return log4js;
    },
    'set global loglevel on creation': function(log4js) {
      var log1 = log4js.getLogger('log1');
      var level = 'OFF';
      if (log1.level.toString() == level) {
        level = 'TRACE';
      }
      assert.notEqual(log1.level.toString(), level);
      log4js.setGlobalLogLevel(level);
      assert.equal(log1.level.toString(), level);
      var log2 = log4js.getLogger('log2');
      assert.equal(log2.level.toString(), level);
    },
    'global change loglevel': function(log4js) {
      var log1 = log4js.getLogger('log1');
      var log2 = log4js.getLogger('log2');
      var level = 'OFF';
      if (log1.level.toString() == level) {
        level = 'TRACE';
      }
      assert.notEqual(log1.level.toString(), level);
      log4js.setGlobalLogLevel(level);
      assert.equal(log1.level.toString(), level);
      assert.equal(log2.level.toString(), level);
    },
    'override loglevel': function(log4js) {
      var log1 = log4js.getLogger('log1');
      var log2 = log4js.getLogger('log2');
      var level = 'OFF';
      if (log1.level.toString() == level) {
        level = 'TRACE';
      }
      assert.notEqual(log1.level.toString(), level);
      var oldLevel = log1.level.toString();
      assert.equal(log2.level.toString(), oldLevel);
      log2.setLevel(level);
      assert.equal(log1.level.toString(), oldLevel);
      assert.equal(log2.level.toString(), level);
      assert.notEqual(oldLevel, level);
      log2.removeLevel();
      assert.equal(log1.level.toString(), oldLevel);
      assert.equal(log2.level.toString(), oldLevel);
    },
    'preload loglevel': function(log4js) {
      var log1 = log4js.getLogger('log1');
      var level = 'OFF';
      if (log1.level.toString() == level) {
        level = 'TRACE';
      }
      assert.notEqual(log1.level.toString(), level);
      var oldLevel = log1.level.toString();
      log4js.getLogger('log2').setLevel(level);
      assert.equal(log1.level.toString(), oldLevel);
      var log2 = log4js.getLogger('log2');
      assert.equal(log2.level.toString(), level);
      assert.notEqual(oldLevel, level);
      log2.removeLevel();
      assert.equal(log1.level.toString(), oldLevel);
      assert.equal(log2.level.toString(), oldLevel);
    },
    'set level on all categories': function(log4js) {
      var log1 = log4js.getLogger('log1');
      var log2 = log4js.getLogger('log2');
      var config = {'levels': {
          'log1': 'ERROR',
          'log2': 'WARN'
        }};
      log4js.configure(config);
      assert.equal('ERROR', log1.level.toString());
      assert.equal('WARN', log2.level.toString());
      log1.removeLevel();
      log2.removeLevel();
      var config2 = {'levels': {'[all]': 'DEBUG'}};
      log4js.configure(config2);
      assert.equal('DEBUG', log1.level.toString());
      assert.equal('DEBUG', log2.level.toString());
    }
  }}).export(module);
