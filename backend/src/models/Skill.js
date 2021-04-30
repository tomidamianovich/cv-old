const { Schema, model } = require('mongoose');

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  person_id: {
    type: String,
    required: true
  }
}, {
  timestamp: true
});

module.exports = model('Skill', SkillSchema);