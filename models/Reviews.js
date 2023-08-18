const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "Review";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field: "review_id",
  },
  reviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
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
      key: "id",
    },
  },

  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Client",
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Doctor",
      key: "id",
    },
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

const associate = ({ Client, Review, Doctor }) => {
  Review.belongsTo(Client, {
    foreignKey: {
      name: "id",
    },
  });

  Review.belongsTo(Doctor, {
    foreignKey: {
      name: "id",
    },
  });
};

module.exports = { modelName, attributes, options, define, associate };
