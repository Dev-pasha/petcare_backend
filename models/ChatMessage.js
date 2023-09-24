const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "chatMessage";


const attributes = {
    messageId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "Chats",
            key: "chatId"
        }
    },

    sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false,
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

}

const options = {
    tableName: "ChatMessage",
    comment: "Messages",
    underscored: true,
};


const define = () => {
    const ChatMessage = sequelize.define(modelName, attributes, options);
    ChatMessage.associate = associate;
    return ChatMessage;
};

const associate = ({
    Chats,
    ChatMessage
}) => {
    ChatMessage.belongsTo(Chats, {
        foreignKey: "chatId",
    });
}

module.exports = { modelName, attributes, options, define, associate };

