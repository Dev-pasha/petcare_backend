const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Client";

const attributes = {
  
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    comment: "Client ID",
    references: {
      model: "users",
      key: "id",
    },
  },
  dateOfFirstAppointment: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "first_appointment_date",
  },
  dateOfLastAppointment: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "last_appointment_date",
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "contact_email",
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "contact_number",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "address",
  },
  notes: {
    type: DataTypes.STRING,
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
  Client.belongsTo(users, { foreignKey: "id" });
  Client.hasMany(Pet, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Client.hasMany(Appointment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Client.hasMany(Payment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = { modelName, attributes, options, define, associate };
