const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequalize = require("./config/db");
require("dotenv").config({ path: "./config/.env" });
const { initModels } = require("./models/index");

initModels();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRoute = require("./routes/userRoute");
const petRoute = require("./routes/petRoute");
app.use("/api", userRoute);
app.use("/api", petRoute);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
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
