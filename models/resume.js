var mongoose = require('mongoose');

// var proficientSkillsSchema = new mongoose.Schema({
//   proficientSkills: String,
// });

// var growingSkillsSchema = new mongoose.Schema({
//   growingSkills: String,
// });

// var projectsSchema = new mongoose.Schema({
//   projectName: String,
//   projectUrl: String,
//   projectCity: String,
//   projectDate: String,
//   projectBulletPoint: String,
// });

// var experienceSchema = new mongoose.Schema({
//   companyName: String,
//   jobTitle: String,
//   companyUrl: String,
//   companyCity: String,
//   startDate: String,
//   endDate: String,
//   jobBulletPoint: String,
// });

// var educationSchema = new mongoose.Schema({
//   institutionName: String,
//   degree: String,
//   major: String,
//   minor: String,
//   date: String,
// });

var resumeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
  phoneNumber: Number,
  email: String,
  website: String,
  linkedIn: String,
  personalSummary: String,
  proficientSkills: [{type: String}],
  growingSkills: [{type: String}],
  projects: [{
    projectName: String,
    projectUrl: String,
    projectCity: String,
    projectDate: String,
    projectBulletPoint: String,
  }],
  experience: [{
    companyName: String,
    jobTitle: String,
    companyUrl: String,
    companyCity: String,
    startDate: String,
    endDate: String,
    jobBulletPoint: String,
  }],
  education: [{
    institutionName: String,
    degree: String,
    major: String,
    minor: String,
    date: String,
  }]
});

module.exports = mongoose.model('Resume', resumeSchema);
