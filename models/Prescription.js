const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const modelName = 'prescription';

const attributes = {
    prescriptionId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prescription_id',
    },

    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'Appointment',
            key: 'appointmentId',
        },
    },


    prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'prescription',
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

};


const options = {
    tableName: 'prescription',
    comment: 'Prescription data',
    underscored: true,
};


const define = () => {
    const prescription = sequelize.define(modelName, attributes, options);
    prescription.associate = associate;
    return prescription;
};


const associate = ({ prescription, Appointment }) => {
    prescription.belongsTo(Appointment, {
        foreignKey: 'appointmentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

};

module.exports = {
    modelName,
    attributes,
    options,
    define,
    associate,
};