const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const admin = require("./Admin");
const client = require("./clients");
const doctor = require("./Doctor");
const support = require("./support");
const Pet = require("./Pets");
const Appointment = require("./Appointments");
const Payment = require("./Payments");
const PetAppointment = require("./PetAppointment");
const Chats = require("./Chats");
const ChatMessage = require("./ChatMessage");
const Notification = require("./Notifications");
const Review = require("./Reviews");
const slot = require("./Slots");
const blog = require("./blog");
const request = require("./Request");
// const LiveSession = require('./liveSession');
const users = require("./Users");

const modelsDefiners = {
  admin,
  client,
  doctor,
  support,
  Pet,
  Appointment,
  slot,
  PetAppointment,
  Chats,
  ChatMessage,
  users,
  blog,
  request,
  
  // Payment,
  Notification,
  // Review,
  // LiveSession,
};

const initModels = (sequelize) => {
  const models = Object.keys(modelsDefiners).reduce((models, modelname) => {
    models[modelname] = modelsDefiners[modelname].define(sequelize, Sequelize);
    return models;
  }, {});

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
};

const models = initModels(sequelize);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables created....");
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  });

module.exports = { models, initModels };
