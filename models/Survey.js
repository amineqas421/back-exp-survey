
const mongoose = require('mongoose');
const elementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  visibleIf: { type: String },
  setValueIf: { type: String }
}, { _id: false });

// Schema for pages within the main schema
const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, },
  description: { type: String }
}, { _id: false });

//Main settings schema
const surveySettingsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pages: [pageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
const surveyResponseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  response: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

const SurveySettings = mongoose.model('SurveySettings', surveySettingsSchema);
const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = { SurveySettings, SurveyResponse };
