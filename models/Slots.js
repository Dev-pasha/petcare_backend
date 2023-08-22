const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "slot";

const attributes = {
  slotId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "slot_id",
  },

  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "doctor",
      key: "doctor_id",
    },
  },

  startTime: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "start_time",
  },

  endTime: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "end_time",
  },

  slotDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "slot_date",
  },

  slotStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "slot_status",
    default: "available",
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
  tableName: "slot",
  comment: "Slot data",
  underscored: true,
};

const define = () => {
  const slot = sequelize.define(modelName, attributes, options);
  slot.associate = associate;
  return slot;
};

const associate = ({ slot, doctor, Appointment }) => {
  slot.belongsTo(doctor, {
    foreignKey: "doctor_id",
  });

  slot.hasMany(Appointment, {
    foreignKey: "appointmentId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = { modelName, attributes, options, define, associate };
