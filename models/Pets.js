const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Pet";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field:"pet_id"
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
  tableName: "Pets",
  comment: "Pet data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const Pet = sequelize.define(modelName, attributes, options);
  Pet.associate = associate;
  return Pet;
};

const associate = ({ Client, Pet, Appointment, PetAppointment }) => {
  Pet.belongsTo(Client, { foreignKey: "id" });
  Pet.hasMany(Appointment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Pet.hasMany(PetAppointment, {
    foreignKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = { modelName, attributes, options, define, associate };
