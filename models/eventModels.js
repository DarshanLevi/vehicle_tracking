const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  vehicleId: { type: String, required: true },
  event: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);

