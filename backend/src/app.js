const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// settings
app.set('port', process.env.PORT || 8000);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/social', require('./routes/social'));
app.use('/api/person', require('./routes/person'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/place', require('./routes/place'));
app.use('/api/course', require('./routes/course'));
app.use('/api/skill', require('./routes/skill'));
app.use('/api/education', require('./routes/education'));

module.exports = app;