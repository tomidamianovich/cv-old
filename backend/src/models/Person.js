const { Schema, model } = require('mongoose');

const personSchema = new Schema({
  language: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  civilStatus: {
    type: String
  },
  birthdate: {
    type: Date,
    required: true
  },
  locationName: {
    type: String
  },
  locationValue: {
    type: String
  },
  profilePhoto: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamp: true
});

module.exports = model('Person', personSchema);