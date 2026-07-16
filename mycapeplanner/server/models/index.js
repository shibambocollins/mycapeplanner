const sequelize = require('../config/db');
const User = require('./User');
const Itinerary = require('./Itinerary');

User.hasMany(Itinerary, { foreignKey: 'userId', onDelete: 'CASCADE' });
Itinerary.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Itinerary };
