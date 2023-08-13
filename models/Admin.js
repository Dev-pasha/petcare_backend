const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "admin";

const attributes = {
  adminId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "adminId",
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

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_name",
    comment: "User's user name",
  },

  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "salary",
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

const associate = ({
  users,
  admin,
  // Payment
}) => {
  admin.belongsTo(users, {
    foreignKey: "adminId",
  });

  // admin.hasMany(Payment, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
