const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Client";

const attributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "client_id",
    comment: "clientId",
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "userId",
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
  contactEmail: {
    type: DataTypes.STRING,
    defaultValue: "contact@gmail.com",
    allowNull: true,
    field: "contact_email",
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "1234567890",
    field: "contact_number",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "123, abc street, xyz city",
    field: "address",
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
};

const options = {
  tableName: "Client",
  comment: "Client data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const Client = sequelize.define(modelName, attributes, options);
  Client.associate = associate;
  return Client;
};

const associate = ({ users, Client, Pet, Appointment, Payment }) => {
  Client.belongsTo(users, { foreignKey: "user_id" });
  // Client.hasMany(Pet, {
  //   foreignKey: "clientId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
  // Client.hasMany(Appointment, {
  //   foreignKey: "clientId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
  // Client.hasMany(Payment, {
  //   foreignKey: "clientId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
