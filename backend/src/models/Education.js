const { Schema, model } = require('mongoose');

const educationSchema = new Schema({
  degree: {
    type: String,
    required: true
  },
  description: {
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

module.exports = model('Education', educationSchema);