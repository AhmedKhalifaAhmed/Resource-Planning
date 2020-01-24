const mongoose = require('mongoose');

const modelName = 'UserGroup';

const schema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  }
});

const model = mongoose.model(modelName, schema);
module.exports = { model, modelName } ;
