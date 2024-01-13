const Event = require('../models/eventModels');

class EventService {
  static getEventsByInterval = async (id) => {
    try {
      const events = await Event.find({
       id,
      }).sort({ timestamp: 1 });

      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Error fetching events');
    }
  }


  static createEvent = async (timestamp, vehicleId, event) => {
    try {
      const newEvent = new Event({
        timestamp: new Date(timestamp),
        vehicleId,
        event,
      });

      await newEvent.save();
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Error creating event');
    }
  };

  static getAllEvents = async () => {
    try {
      const allEvents = await Event.find().sort({ timestamp: 1 });
      return allEvents;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw new Error('Error fetching all events');
    }
  };
}


module.exports = EventService;
