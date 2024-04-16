const sequelize = require("sequelize");
const db = require("../config/database");

const Game = db.define("game", {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  result: { type: sequelize.STRING },
});

module.exports = Game;
