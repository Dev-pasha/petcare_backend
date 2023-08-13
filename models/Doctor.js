const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Doctor";

const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "doctor_id",
    comment: "Doctor id",
    references: {
      model: "users",
      key: "user_id",
    },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "specialization",
  },

  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "license_number",
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "education",
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "experience",
  },

  joiningDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "joining_date",
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "contact_email",
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "contact_number",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "address",
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
};

const options = {
  tableName: "Doctor",
  comment: "Doctor data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const Doctor = sequelize.define(modelName, attributes, options);
  Doctor.associate = associate;
  return Doctor;
};

const associate = ({ users, Doctor, Review, Appointment }) => {
  Doctor.belongsTo(users, { foreignKey: "user_id" });
  // Doctor.hasMany(Review, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
  // Doctor.hasMany(Appointment, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
