const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Support";

const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    comment: "Support ID",
    references: {
      model: "users",
      key: "id",
    },
  },
  joiningDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "joining_date",
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
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "salary",
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
  tableName: "Support",
  comment: "Support data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const Support = sequelize.define(modelName, attributes, options);
  Support.associate = associate;
  return Support;
};

const associate = ({ users, Support }) => {
  Support.belongsTo(users, { foreignKey: "id" });
};

module.exports = { modelName, attributes, options, define, associate };
