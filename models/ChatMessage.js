const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "ChatMessage";

const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    comment: "Chat Message id",
  },


  chatId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "chat_id",
    references: {
      model: "Chats",
      key: "chat_id",
    },
  },

  message: {
    field: 'message',
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'message',
  },

  userA: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_a",
    references: {
      model: "users",
      key: "user_id",
    },
  },

  userB: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_b",
    references: {
      model: "users",
      key: "user_id",
    },
  },

  message: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "message",
    comment: "Message",
  },

  meta: {
    field: 'meta',
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Meta information on the chat message',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
  },
};

const options = {
  tableName: "ChatMessage",
  comment: "Chat Message",
  underscored: true,
};

const define = () => {
  const ChatMessage = sequelize.define(modelName, attributes, options);
  ChatMessage.associate = associate;
  return ChatMessage;
};

const associate = ({ Chats, ChatMessage }) => {
  ChatMessage.belongsTo(Chats, {
    foreignKey: "chat_id",
  });
  
};

module.exports = { modelName, attributes, options, define, associate };
