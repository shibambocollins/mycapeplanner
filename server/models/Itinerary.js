const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Itinerary = sequelize.define('Itinerary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isItinerary: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Itinerary;
