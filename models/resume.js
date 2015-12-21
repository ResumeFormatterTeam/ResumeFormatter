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
    projectBulletPoint: Array,
  }],
  experience: [{
    companyName: String,
    jobTitle: String,
    companyUrl: String,
    companyCity: String,
    startDate: String,
    endDate: String,
    jobBulletPoint: Array,
  }],
  education: [{
    institutionName: String,
    degree: String,
    major: String,
    minor: String,
    startDate: String,
    endDate: String
  }],
  skillOrder: {type: Number, default: 0},
  projectsOrder: {type: Number, default: 1},
  experienceOrder: {type: Number, default: 2},
  educationOrder: {type: Number, default: 3}
});

module.exports = mongoose.model('Resume', resumeSchema);
