const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const modelName = "LiveSession";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    field: "session_id",
    allowNull: false,
  },
  id: {
    field: "id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Client",
      key: "id",
    },
  },
  id: {
    field: "id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Doctor",
      key: "id",
    },
  },
  id: {
    field: "appointment_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Appointment",
      key: "appointment_id",
    },
  },
  sessionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "session_date",
  },
  sessionStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "session_status",
  },
  sessionLink: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "session_link",
  },
  sessionStartTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "session_start_time",
  },
  sessionEndTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "session_end_time",
  },
  sessionDuration: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "session_duration",
  },
};

const options = {
  tableName: "liveSession",
  comment: "LiveSession data",
  paranoid: true,
  underscored: true,
};

const define = () => {
  const LiveSession = sequelize.define(modelName, attributes, options);
  LiveSession.associate = associate;
  return LiveSession;
};

const associate = ({ Client, Doctor, Appointment, LiveSession }) => {
  LiveSession.belongsTo(Client, {
    foreignKey: {
      name: "id",
    },
  });

  LiveSession.belongsTo(Doctor, {
    foreignKey: {
      name: "id",
    },
  });

  LiveSession.belongsTo(Appointment, {
    foreignKey: {
      name: "id",
    },
  });
};

module.exports = { modelName, attributes, options, define, associate };
