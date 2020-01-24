const Joi = require('joi');

const validateLogin = body => {
  // Creating schema
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  // Running schema
  return Joi.validate(body, schema);;
};

module.exports = { validateLogin };