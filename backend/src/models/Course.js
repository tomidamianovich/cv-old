const { Schema, model } = require('mongoose');

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
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

module.exports = model('Course', CourseSchema);