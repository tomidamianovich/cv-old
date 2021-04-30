const { Schema, model } = require('mongoose');

const personSchema = new Schema({
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
  }
}, {
  timestamp: true
});

module.exports = model('Person', personSchema);