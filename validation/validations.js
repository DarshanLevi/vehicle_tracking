const Joi = require('joi');

const intervalDataSchema = Joi.object({
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  vehicleId: Joi.string().required(),
  event: Joi.string().required(),
});

module.exports = {
  intervalDataSchema,
};
