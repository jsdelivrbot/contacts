/* */ 
var assert = require('assert');
var qjob = require('../qjobs');
var q = new qjob({maxConcurrency: 2});
var testExecutedJobs = 0;
var myjob = function(args, next) {
  setTimeout(function() {
    testExecutedJobs++;
    next();
  }, 50);
};
for (var i = 0; i < 10; i++) {
  q.add(myjob, ['test' + i]);
}
q.on('end', function() {
  assert.equal(testExecutedJobs, 10);
});
q.run();
