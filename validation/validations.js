const Joi = require('joi');

const intervalDataSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  intervalDataSchema,
};
