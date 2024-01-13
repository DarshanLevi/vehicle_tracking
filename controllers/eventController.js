const Event = require('../models/eventModels');
const { intervalDataSchema } = require('../validation/validations');

const getIntervalData = async (req, res) => {
  try {
    // Validate request parameters using Joi schema
    const { error, value } = intervalDataSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = value;

    // Fetch events for the given ID
    const events = await Event.find({
      id,
    }).sort({ timestamp: 1 });

    // Check if there are any events
    if (events.length === 0) return res.status(404).json({ error: 'No events found for the specified ID' });

    // Transform events into intervals with from, to, and event
    const intervals = events.map(event => ({
      from: event.timestamp.getTime(),
      to: event.timestamp.getTime(), // Assuming 'to' should be the same as 'from' for each event
      event: event.event,
    }));

    res.json(intervals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find().sort({ timestamp: 1 });

    // Transform events into the desired format
    const formattedEvents = allEvents.map(event => ({
      event: event.event,
      from: event.timestamp.getTime(),
      to: event.timestamp.getTime(), // Assuming 'to' should be the same as 'from' for each event
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getIntervalData, getAllEvents };
