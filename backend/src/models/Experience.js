const { Schema, model } = require('mongoose');

const experienceSchema = new Schema({
  jobTitle: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true
  },
  person_id: {
    type: String,
    required: true
  }
}, {
  timestamp: true
});

module.exports = model('Experience', experienceSchema);