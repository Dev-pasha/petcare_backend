const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "admin";

const attributes = {
  
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: "id",
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
  socialProfile: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "social_profile",
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "profile_picture",
  },
};

const options = {
  tableName: "admin",
  comment: "admin data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const admin = sequelize.define(modelName, attributes, options);
  admin.associate = associate;
  return admin;
};

const associate = ({ users, admin, Payment }) => {
  admin.belongsTo(users, {
    foreignKey: "id",
  });

  admin.hasMany(Payment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = { modelName, attributes, options, define, associate };
