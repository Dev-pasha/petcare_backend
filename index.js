const express = require("express");
const app = express();
var http = require('http').Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const sequalize = require("./config/db");
require("dotenv").config({ path: "./config/.env" });
const { initModels } = require("./models/index");
const { initializeSocket  } = require("./socket");

initModels();

// Middleware
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoute = require("./routes/authRoute");
const petRoute = require("./routes/petRoute");
const userRoute = require("./routes/userRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const reviewRoute = require("./routes/reviewRoute");
const petAppointmentRoute = require("./routes/petApointmentRoute");
const slotRoute = require("./routes/slotRoute");
const chatRoute = require("./routes/chatsRoute");
const chatMessageRoute = require("./routes/chatMessage");

app.use("/api", authRoute);
app.use("/api", petRoute);
app.use("/api", userRoute);
app.use("/api", appointmentRoute);
app.use("/api", reviewRoute);
app.use("/api", petAppointmentRoute);
app.use("/api", slotRoute);
app.use("/api", chatRoute);
app.use("/api", chatMessageRoute);

const PORT = process.env.PORT || 5000;

const io = initializeSocket(http);


http.listen(PORT, () => {
  sequalize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error.message);
      throw error.message;
    });
  console.log(`Server is running on port ${PORT}.`);
});



module.exports = { app, io };