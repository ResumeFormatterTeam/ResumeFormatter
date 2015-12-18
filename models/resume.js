var mongoose = require('mongoose');

var resumeSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  jobTitle: String,
  phoneNumber: String,
  email: String,
  website: String,
  linkedIn: String,
  personalSummary: String,
  proficientSkills: String,
  growingSkills: String,
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
    startDate: String,
    endDate: String
  }]
});

module.exports = mongoose.model('Resume', resumeSchema);
