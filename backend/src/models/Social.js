const { Schema, model } = require('mongoose');

const socialSchema = new Schema({
  instagram: {
    type: String,
    required: true,
    trim: true
  },
  facebook: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  mail: {
    type: String,
    required: true,
    trim: true
  },
  linkedIn: {
    type: String,
    required: true,
    trim: true
  },
  person_id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamp: true
});

module.exports = model('Social', socialSchema);