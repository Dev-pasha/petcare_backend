const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "PetAppointment";

const attributes = {
  petAppointmentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field: "pet_appointment_id",
  },

  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Pets",
      key: "petId",
    },
    
  },

  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Appointment",
      key: "appointmentId",
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updated_at",
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
  PetAppointment.belongsTo(Pet, { foreignKey: "pet_id" });
  PetAppointment.belongsTo(Appointment, { foreignKey: "appointment_id" });
};

module.exports = { modelName, attributes, options, define, associate };
