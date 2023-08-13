const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "user";

const attributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "user_id",
    type: DataTypes.INTEGER,
    comment: "User id",
  },

  type: {
    type: DataTypes.ENUM("ADMIN", "CLIENT", "DOCTOR", "SUPPORT"),
    allowNull: false,
  },

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_name",
    comment: "User's user name",
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "User's first name",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "User's last name",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "email",
    comment: "User's email",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "password",
    comment: "User's password",
  },

  meta: {
    field: "meta",
    type: DataTypes.JSONB,
    allowNull: true,
    comment: "Meta information on the user",
  },

  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "date_of_birth",
    comment: "User's date of birth",
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "phone_number",
    comment: "User's phone number",
  },
  registerDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "register_date",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    comment: "User's creation date",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updated_at",
    comment: "User's last update date",
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "deleted_at",
  },
};

const options = {
  tableName: "users",
  comment: "User data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const users = sequelize.define(modelName, attributes, options);
  users.associate = associate;
  return users;
};

const associate = ({
  users,
  admin,
  Chats,
  Notification,
  Client,
  Doctor,
  Support,
}) => {
  users.hasOne(admin, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  users.hasOne(Client, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  users.hasOne(Doctor, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  users.hasOne(Support, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // users.hasMany(Chats, {
  //   foreignKey: "senderId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
  // users.hasMany(Chats, {
  //   foreignKey: "receiverId",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });

  // users.hasMany(Notification, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
