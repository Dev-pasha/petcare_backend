const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Payment";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    comment: "payment_id",
    primaryKey: true,
    references: {
      model: "Appointment",
      key: "id",
    },
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "amount",
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "payment_date",
  },
  paymentTime: {
    type: DataTypes.TIME,
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
  adminApproval: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "admin_approval",
  },

 
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id",
    references: {
      model: "Client",
      key: "id",
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
 
};

const options = {
  tableName: "payment",
  comment: "Payment data",
  underscored: true,
};

const define = () => {
  const Payment = sequelize.define(modelName, attributes, options);
  Payment.associate = associate;
  return Payment;
};

const associate = ({ Payment, admin, Client, Doctor, Appointment }) => {
  Payment.belongsTo(admin, { foreignKey: "id" });
  Payment.belongsTo(Client, { foreignKey: "id" });
  Payment.belongsTo(Appointment, { foreignKey: "id" });
};

module.exports = { modelName, attributes, options, define, associate };
