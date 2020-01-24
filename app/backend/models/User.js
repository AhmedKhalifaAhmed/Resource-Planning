const mongoose = require('mongoose');
const UserGroup = require('./UserGroup');

const modelName = 'User';

const schema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  userGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserGroup.modelName,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const model = mongoose.model(modelName, schema);

module.exports = { model, modelName };
