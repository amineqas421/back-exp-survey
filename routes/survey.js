
const express = require('express');
const { SurveySettings, SurveyResponse } = require('../models/Survey');

const router = express.Router();

// Save survey settings
router.post('/settings', async (req, res, next) => {
  try {
     const surveySettings = req.body;
     const newItem = new SurveySettings(surveySettings);
      const result = await newItem.save();
      res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Duplicate survey settings
router.post('/settings/duplicate/:surveyId', async (req, res, next) => {
    const { surveyId } = req.params;
    try {
      const settings = await SurveySettings.findOne({ _id:surveyId });
      if(!settings){
        return res.status(404).send('Item not found');
      }
      const newItemData = settings.toObject();
      delete newItemData._id;
      const duplicateSurvey = new SurveySettings(newItemData);
      duplicateSurvey.save()
      res.status(200).send(duplicateSurvey);
    } catch (error) {
      res.status(404).send({notFound : true});
    } 
});

// Get all survey settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await SurveySettings.find();
    res.status(200).send(settings);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Save survey response
router.post('/responses', async (req, res) => {
  const { surveyId, response } = req.body;
  try {
    const surveyResponse = new SurveyResponse({ surveyId, response });
    await surveyResponse.save();
    res.status(201).send(surveyResponse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all responses for a specific survey
router.get('/responses/:surveyId', async (req, res) => {
  const { surveyId } = req.params;
  try {
    const responses = await SurveyResponse.findOne({ surveyId });
    res.status(200).send(responses);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get specific survey by ID
router.get('/settings/:surveyId', async (req, res) => {
  const { surveyId } = req.params;
  try {
    const settings = await SurveySettings.findOne({ _id:surveyId });
    res.status(200).send(settings);
  } catch (error) {
    res.status(404).send({notFound : true});
  }
});

// Update specific survey by ID
router.put('/settings/:surveyId', async (req, res) => {
  const { surveyId } = req.params;
  const surveySetting = req.body;

  try {
    const settings = await SurveySettings.findByIdAndUpdate(surveyId, surveySetting)
    res.status(200).send(settings[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Delete specific survey by ID
router.delete('/settings/:surveyId', async (req, res) => {
  const { surveyId } = req.params;
  try {
    await SurveySettings.deleteOne({ _id:surveyId });
    res.status(200).send({ deleted: true });
  } catch (error) {
    res.status(404).send({notFound : true});
  }
});
module.exports = router;
