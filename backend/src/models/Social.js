const { Schema, model } = require('mongoose');

const socialSchema = new Schema({
  instagram: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  facebook: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  linkedIn: {
    type: String,
    required: true,
    trim: true,
    unique: true
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