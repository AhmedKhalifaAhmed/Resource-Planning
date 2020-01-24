const dotenv = require('dotenv')
// Set env variables
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import api routes
const Auth = require('./routes/api/auth');

// Create app
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
// Connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('connected to Database'))
  .catch(err => console.log(err));

// Register api routes
app.use('/api/auth', Auth);
// Create 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});
// Run application
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));