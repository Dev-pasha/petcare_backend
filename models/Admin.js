const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "admin";

const attributes = {
  adminId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "admin_id",
    references: {
      model: "users",
      key: "user_id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  adminRole: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "admin_role",
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
  tableName: "admin",
  comment: "admin data",
  underscored: true,
};

const define = () => {
  const admin = sequelize.define(modelName, attributes, options);
  admin.associate = associate;
  return admin;
};

const associate = ({
  users,
  request,
  admin,
  blog
  // Payment
}) => {

  admin.belongsTo(users, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  admin.hasMany(request, {
    foreignKey: "admin_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
   
  });

  admin.hasMany(blog, {
    foreignKey: "admin_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // admin.hasMany(Payment, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
