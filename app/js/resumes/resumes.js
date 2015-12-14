//require in all controllers, directives, transculdes, etc.
module.exports = function(app) {
  require('./controllers/resumes_controller')(app);
  require('./directives/form_block_directive')(app);
};
