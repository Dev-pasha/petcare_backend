const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "client";

const attributes = {
  clientId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "client_id",
    references: {
      model: "users",
      key: "user_id",
    },
  },

  dateOfFirstAppointment: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "first_appointment_date",
  },
  dateOfLastAppointment: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "last_appointment_date",
  },
  notes: {
    type: DataTypes.STRING,
    defaultValue: "No notes",
    allowNull: true,
    field: "notes",
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "profile_picture",
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
  tableName: "client",
  comment: "client data",
  underscored: true,
};

const define = () => {
  const client = sequelize.define(modelName, attributes, options);
  client.associate = associate;
  return client;
};

const associate = ({ users, client, Pet, Appointment, Payment }) => {
  client.belongsTo(users, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  client.hasMany(Pet, {
    foreignKey: "petId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  client.hasMany(Appointment, {
    foreignKey: "appointmentId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });


  // Client.hasMany(Payment, {
  //   foreignKey: "clientId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
