const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "votes";

const attributes = {

    voteId : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "vote_id",
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        reference: {
            model: "users",
            key: "user_id",
        },
    },

    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "blog_id",
        reference: {
            model: "blog",
            key: "blog_id",
        },
    },

    voteType: {
        type: DataTypes.ENUM("upvote", "downvote"),
        allowNull: true,
        field: "vote_type",
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

};

const options = {
    tableName: "votes",
    comment: "votes data",
    underscored: true,
};

const define = () => {
    const votes = sequelize.define(modelName, attributes, options);
    votes.associate = associate;
    return votes;
};

const associate = ({
    users,
    blog,
    votes
}) => {
    votes.belongsTo(users, {
        foreignKey: "user_id",
    });
    votes.belongsTo(blog, {
        foreignKey: "blog_id",
    });
};

module.exports = {
    modelName,
    attributes,
    options,
    define,
    associate,
};
