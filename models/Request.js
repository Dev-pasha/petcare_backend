const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "request";

const attributes = {
    requestId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "request_id",
    },
    
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "admin_id",
        references: {
            model: "admin",
            key: "admin_id",
        },
    },
    requestType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "request_type",
    },
    requestStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "request_status",
    },
    requestDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "request_description",
    },
    requestDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "request_date",
    },
    requestTime: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "request_time",
    },
    requestResourceName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "request_resource_name",
    },
    requestResourceEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "request_resource_email",
    },
    requestResourcePhone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "request_resource_phone",
    },
    requestResourceAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "request_resource_address",
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "created_at",
    },
    updatedAt: {
        allowNull: true,
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
    tableName: "request",
    comment: "request data",
    underscored: true,
};

const define = () => {
    const request = sequelize.define(modelName, attributes, options);
    request.associate = associate;
    return request;
};

const associate = ({ admin, request }) => {
    request.belongsTo(admin, {
        foreignKey: "admin_id",
    });
};


module.exports = {
    modelName,
    attributes,
    options,
    define,
    associate,
};