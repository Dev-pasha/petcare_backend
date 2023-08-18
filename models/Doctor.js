const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "doctor";

const attributes = {
  doctorId: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "doctor_id",
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
  tableName: "Doctor",
  comment: "Doctor data",
  underscored: true,
};

const define = () => {
  const doctor = sequelize.define(modelName, attributes, options);
  doctor.associate = associate;
  return doctor;
};

const associate = ({ users, doctor,
   Review, Appointment
   }) => {

  doctor.belongsTo(users, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  doctor.hasMany(Appointment, {
    foreignKey: "appointmentId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Doctor.hasMany(Review, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
