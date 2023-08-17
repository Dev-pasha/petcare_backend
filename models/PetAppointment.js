const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "PetAppointment";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Pets",
      key: "pet_id",
    },
  },

  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Appointment",
      key: "appointment_id",
    },
  },
};

const options = {
  tableName: "pet_appointment",
  comment: "Pet Appointment data",
  underscored: true,
};

const define = () => {
  const PetAppointment = sequelize.define(modelName, attributes, options);
  PetAppointment.associate = associate;
  return PetAppointment;
};

const associate = ({ PetAppointment, Pet, Appointment }) => {
  PetAppointment.belongsTo(Pet, { foreignKey: "id" });
  PetAppointment.belongsTo(Appointment, { foreignKey: "id" });
};

module.exports = { modelName, attributes, options, define, associate };
