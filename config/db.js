const Sequalize = require("sequelize");

const sequalize = new Sequalize("petcare", "postgres", "pasha13", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

module.exports = sequalize;
