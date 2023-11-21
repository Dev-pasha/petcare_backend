const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const modelName = "blog";

const attributes = {
    blogId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "blog_id",
    },
    
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "admin_id",
        reference: {
            model: "admin",
            key: "admin_id",
        },
    },

    blogTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "blog_title",
    },
    
    blogDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "blog_description",
    },
    
    blogImage: {
        // multiple images,
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        field: "blog_image",
    },

    blogCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "blog_category",
    },

    timeToRead: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "time_to_read",
    },

    blogAuthor: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "blog_author",
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
    tableName: "blog",
    comment: "blog data",
    underscored: true,
}

const define = () => {
    const blog = sequelize.define(modelName, attributes, options);
    blog.associate = associate;
    return blog;
}

const associate = ({
    admin,
    blog,
    votes
}) => {
    blog.belongsTo(admin, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });

    blog.hasMany(votes, {
        foreignKey: "blog_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });

    
};


module.exports = {
    modelName,
    attributes,
    options,
    define,
    associate,
}