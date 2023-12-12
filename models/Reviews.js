const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Review";

const attributes = {

  reviewId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    // field: "review_id",
    references: {
      model: "Appointment",
      key: "appointment_id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  reviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "review_date",
  },
  reviewRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "review_rating",
  },
  reviewComment: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "review_comment",
  },
  reviewStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "review_status",
  },

  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "admin",
      key: "admin_id",
    },
  },

  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "client",
      key: "client_id",
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "doctor",
      key: "doctor_id",
    },
  },

  // appointmentId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: "Appointment",
  //     key: "appointment_id",
  //   },
  // },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },

};

const options = {
  tableName: "review",
  comment: "Review data",
  underscored: true,
};

const define = () => {
  const Review = sequelize.define(modelName, attributes, options);
  Review.associate = associate;
  return Review;
};

const associate = ({ client, Review, doctor, Appointment }) => {


  Review.belongsTo(client, {
    foreignKey: "client_id",
  });



  Review.belongsTo(doctor, {
    foreignKey: "doctor_id",
  });


  Review.belongsTo(Appointment, {
    foreignKey: "appointment_id"
  });
};

module.exports = { modelName, attributes, options, define, associate };
