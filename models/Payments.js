const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Payment";

const attributes = {
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: "payment_id",
    references: {
      model: "Appointment",
      key: "appointmentId",
    },
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "amount",
  },

  paymentDate: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "payment_date",
  },

  paymentTime: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "payment_time",
  },

  paymentType: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "payment_type",
  },

  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "payment_status",
  },

  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "payment_method",
  },

  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "transaction_id",
  },

  // adminApproval: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: true,
  //   field: "admin_approval",
  // },

  // clientId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   field: "id",
  //   references: {
  //     model: "Client",
  //     key: "id",
  //   },
  // },

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
  tableName: "Payment",
  comment: "Payment data",
  underscored: true,
};

const define = () => {
  const Payment = sequelize.define(modelName, attributes, options);
  Payment.associate = associate;
  return Payment;
};

const associate = ({ Payment, Appointment }) => {
  Payment.belongsTo(Appointment, {
    foreignKey: "appointmentId",
  });
};

module.exports = { modelName, attributes, options, define, associate };
