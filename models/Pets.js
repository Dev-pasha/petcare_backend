const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Pet";

const attributes = {
  petId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "client",
      key: "client_id",
    },
  },

  petName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "pet_name",
  },
  petType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "pet_type",
  },
  petBreed: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "pet_breed",
  },
  petAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "pet_age",
  },
  petGender: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "pet_gender",
  },
  petWeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "pet_weight",
  },
  petHeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "pet_height",
  },
  petColor: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "pet_color",
  },
  petDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "pet_description",
  },
  petImage: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "pet_image",
  },
  petStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "pet_status",
  },
  medicalHistory: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "medical_history",
  },
  lastVisit: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "last_visit",
  },
  nextVisit: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "next_visit",
  },
};

const options = {
  tableName: "Pet",
  comment: "Pet data",
  underscored: true,
};

const define = () => {
  const Pet = sequelize.define(modelName, attributes, options);
  Pet.associate = associate;
  return Pet;
};

const associate = ({ client, Pet, Appointment, PetAppointment }) => {
  Pet.belongsTo(client, { foreignKey: "client_id" });

  // Pet.hasMany(Appointment, {
  //   foreignKey: "appointment_id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });

  // Pet.hasMany(PetAppointment, {
  //   foreignKey: "id",
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // });
};

module.exports = { modelName, attributes, options, define, associate };
