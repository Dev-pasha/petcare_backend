const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "support";

const attributes = {
  supportId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    references: {
      model: "users",
      key: "user_id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  suportRole: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "support_role",
  },

  joiningDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "joining_date",
  },

  notes: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "notes",
  },

  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "profile_picture",
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
  tableName: "Support",
  comment: "Support data",
  underscored: true,
};

const define = () => {
  const support = sequelize.define(modelName, attributes, options);
  support.associate = associate;
  return support;
};

const associate = ({ users, support }) => {
  support.belongsTo(users, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = { modelName, attributes, options, define, associate };
