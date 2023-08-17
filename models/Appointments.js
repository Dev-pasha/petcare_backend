const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Appointment";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: "appointment_id",
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

  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Client",
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Doctor",
      key: "id",
    },
  },

  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "appointment_date",
  },
  appointmentTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "appointment_time",
  },
  appointmentType: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "appointment_type",
  },
  appointmentNotes: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "appointment_notes_purpose",
  },
  appointmentStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "appointment_status",
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "payment_status",
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "updated_at",
  },

  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "deleted_at",
  },
 
};

const options = {
  tableName: "Appointment",
  comment: "Appointment data",
  underscored: true,
};

const define = () => {
  const Appointment = sequelize.define(modelName, attributes, options);
  Appointment.associate = associate;
  return Appointment;
};

const associate = ({
  Appointment,
  Doctor,
  Client,
  Pet,
  PetAppointment,
  Payment,
  LiveSession,
}) => {
  Appointment.belongsTo(Doctor, { foreignKey: "id" });
  Appointment.belongsTo(Client, { foreignKey: "id" });
  Appointment.belongsTo(Pet, { foreignKey: "id" });
  Appointment.hasMany(PetAppointment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Appointment.hasOne(Payment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  // Appointment.hasOne(LiveSession, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
