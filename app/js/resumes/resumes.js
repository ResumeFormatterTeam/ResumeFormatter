//require in all controllers, directives, transculdes, etc.
module.exports = function(app) {
  require('./controllers/resume_controller')(app);
  require('./services/current_resume_service')(app);
  require('./directives/form_block_directive')(app);
  require('./directives/bullet_point_form_directive')(app);
  require('./directives/long_pi_form_directive')(app);

};
