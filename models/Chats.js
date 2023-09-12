const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const modelName = "chat";

const attributes = {
    chatId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    userA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_a",
        references: {
            model: "users",
            key: "user_id",
        },
    },
    userB: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_b",
        references: {
            model: "users",
            key: "user_id",
        },
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
    tableName: "Chats",
    comment: "Chat data",
    underscored: true,
};


const define = () => {
    const Chats = sequelize.define(modelName, attributes, options);
    Chats.associate = associate;
    return Chats;
};

const associate = ({
    users,
    ChatMessage,
    Chats
}) => {

    Chats.belongsTo(users, {
        foreignKey: "userA",
    });

    Chats.belongsTo(users, {
        foreignKey: "userB",
    });

    Chats.hasMany(ChatMessage, {
        foreignKey: "chatId",
    });




}

module.exports = { modelName, attributes, options, define, associate };




// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const modelName = "Chat";

// const attributes = {
//   chatId: {
//     primaryKey: true,
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     field: "chat_id",
//     comment: "Chat ID",
//   },
//   userA: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     field: "user_a",
//     references: {
//       model: "users",
//       key: "user_id",
//     },
//   },
//   userB: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     field: "user_b",
//     references: {
//       model: "users",
//       key: "user_id",
//     },
//   },

//   message: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     field: "message",
//     comment: "Message",
//   },

//   isRead: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     field: "is_read",
//     comment: "Is Read",
//   },


//   attachement: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     field: "attachement",
//     comment: "Attachement",
//   },

//   messageStatus: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     field: "message_status",
//     comment: "Message Status",
//   },

//   meta: {
//     field: 'meta',
//     type: DataTypes.JSONB,
//     allowNull: true,
//     comment: 'Meta information on the chat',
//   },

//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     field: "created_at",
//   },

//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     field: "updated_at",
//   },

//   deletedAt: {
//     allowNull: true,
//     type: DataTypes.DATE,
//     field: "deleted_at",
//   },
// };

// const options = {
//   tableName: "Chats",
//   comment: "Chat data",
//   underscored: true,
// };

// const define = () => {
//   const Chats = sequelize.define(modelName, attributes, options);
//   Chats.associate = associate;
//   return Chats;
// };

// const associate = ({ users, Chats,
//     //  ChatMessage
//      }) => {
//   Chats.belongsTo(users, {
//     foreignKey: "userA",
//   });
//   Chats.belongsTo(users, {
//     foreignKey: "userB",
//   });
// //   Chats.hasMany(ChatMessage, {
// //     foreignKey: "chat_id",
// //   });

// };

// module.exports = { modelName, attributes, options, define, associate };
