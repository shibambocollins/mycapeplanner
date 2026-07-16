const { Itinerary } = require('../models');

exports.list = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
    });
    res.json({ itineraries });
  } catch (err) {
    console.error('List itineraries error:', err);
    res.status(500).json({ message: 'Failed to load itineraries' });
  }
};

exports.create = async (req, res) => {
  try {
    const { text, isItinerary } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const itinerary = await Itinerary.create({
      text,
      isItinerary: !!isItinerary,
      userId: req.userId,
    });
    res.status(201).json({ itinerary });
  } catch (err) {
    console.error('Create itinerary error:', err);
    res.status(500).json({ message: 'Failed to save itinerary' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findOne({ where: { id, userId: req.userId } });
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    await itinerary.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete itinerary error:', err);
    res.status(500).json({ message: 'Failed to delete itinerary' });
  }
};
