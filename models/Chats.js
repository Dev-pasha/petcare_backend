const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Chat";

const attributes = {
  chatId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "chat_id",
    comment: "Chat ID",
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "sender",
    comment: "Sender",
    references: {
      model: "users",
      key: "id",
    },
  },
  reciever: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "reciver",
    comment: "Reciver",
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

  attachement: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "attachement",
    comment: "Attachement",
  },

  messageStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "message_status",
    comment: "Message Status",
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
  tableName: "Chats",
  comment: "Chat data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const Chats = sequelize.define(modelName, attributes, options);
  Chats.associate = associate;
  return Chats;
};

const associate = ({ users, Chats }) => {
  Chats.belongsTo(users, {
    foreignKey: "senderId",
  });
  Chats.belongsTo(users, {
    foreignKey: "recieverId",
  });
};

module.exports = { modelName, attributes, options, define, associate };
