const { Schema, model } = require('mongoose');

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamp: true
});

module.exports = model('Place', placeSchema);