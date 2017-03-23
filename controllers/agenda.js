var app          = require('../app');

exports.scheduleEvent = function(appliance, params) {
  console.log("EVENT SCHEDULED");
  console.log(appliance);
  console.log(params);
  app.agenda.schedule(params.when, 'greet the world1', {num: 2});
};


exports.getJobs = function(params) {
	var retJobs;
	console.log("AGENDA GET JOBS LOCAL ------------------");
	app.agenda.jobs({}, function(err, jobs) {
	  console.log("errores " + err);
	  console.log("jobs " + jobs);
	  return jobs;
	});	
};