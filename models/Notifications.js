const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Notification";

const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    comment: "Notification Id",
  },
  usersId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id",
    references: {
      model: "users",
      key: "id",
    },
  },

  message: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "message",
    comment: "Message",
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "is_read",
    comment: "Is Read",
  },

  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "action_type",
    comment: "Action Type",
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
  tableName: "notification",
  comment: "Notification data",
  underscored: true,
};

const define = () => {
  const Notification = sequelize.define(modelName, attributes, options);
  Notification.associate = associate;
  return Notification;
};

const associate = ({ users, Notification }) => {
  Notification.belongsTo(users, {
    foreignKey: "id",
  });
};

module.exports = { modelName, attributes, options, define, associate };
