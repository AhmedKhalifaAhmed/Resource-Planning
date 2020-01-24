const Joi = require('joi');

const validateCreate = body => {
  // Creating schema
  const schema = Joi.object().keys({
    groupName: Joi.string().required(),
  });
  // Running schema
  return Joi.validate(body, schema);
};

const validateUpdate = body => {
  // Creating schema
  const schema = Joi.object().keys({
    groupName: Joi.string(),
  });
  // Running schema
  return Joi.validate(body, schema);
};

module.exports = { validateCreate, validateUpdate };
