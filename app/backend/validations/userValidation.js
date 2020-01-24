const Joi = require('joi');

const validateCreate = body => {
  // Creating schema
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    userGroup: Joi.any().required(),
  });
  // Running schema
  return Joi.validate(body, schema);
};

const validateUpdate = body => {
  // Creating schema
  const schema = Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
    userGroup: Joi.any(),
  });
  // Running schema
  return Joi.validate(body, schema);
};

module.exports = { validateCreate, validateUpdate };
