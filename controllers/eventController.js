const Event = require('../models/eventModels');
const { intervalDataSchema } = require('../validation/validations');

const getIntervalData = async (req, res) => {
  try {
    // Validate request parameters using Joi schema
    const { error, value } = intervalDataSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { startDate, endDate, vehicleId } = value;

    // Validate date order
    const validStartDate = new Date(startDate);
    const validEndDate = new Date(endDate);
    if (validStartDate > validEndDate) return res.status(400).json({ error: 'startDate cannot be greater than endDate' });

    // Fetch events within the specified interval and for the given vehicleId
    const events = await Event.find({
      vehicleId,
      timestamp: { $gte: validStartDate, $lte: validEndDate },
    }).sort({ timestamp: 1 });

    // Check if there are events before startDate
    let firstIntervalEvent = 'no_data';
    if (events.length > 0 && events[0].timestamp < validStartDate) firstIntervalEvent = events[0].event;

    // Transform events into intervals
    const intervals = events.reduce((result, event) => {
      const eventTime = event.timestamp.toISOString();
      const fromTimestamp = new Date(eventTime).getTime();
      const toTimestamp = new Date(endDate).getTime();

      if (eventTime <= endDate && event.event !== result[result.length - 1].event) {
        result.push({ event: event.event, from: fromTimestamp, to: toTimestamp });
      }

      return result;
    }, [{ event: firstIntervalEvent, from: new Date(startDate).getTime(), to: new Date(endDate).getTime() }]);

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
