const express = require("express");
const app = express();
const multer = require("multer");
const cron = require("node-cron");
var http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequalize = require("./config/db");
require("dotenv").config({ path: "./config/.env" });
const { initModels } = require("./models/index");
const {
  multerConfig,
  generateDynamicUploadFolder,
} = require("./multerService");
const {
  pendingSlotToAvailableCronJob,
  initateAppointmentReminderCron,
  initiateMessageNotificationDeleteCron,
  reminder,
  deleteMeetingNotificationCron
} = require("./jobs/appointment-jobs");
const { initializeSocket } = require("./socket");

initModels();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use('/uploads/pet', express.static('uploads/pet'));
app.use('/uploads/user', express.static('uploads/user'));



// multer

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads/images");
//   },

//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   }

// });

// const upload = multer({ storage });


// const upload = multer({ dest : "uploads/images"})
app.post("/api/uploadFile", multerConfig("pet").single("file"), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

app.post("/api/uploadUserFile", multerConfig("user").single("file"), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});



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
const adminRoute = require("./routes/adminRoute");
const clientRoute = require("./routes/clientRoute");
const doctorRoute = require("./routes/doctorRoute");
const paymentRoute = require("./routes/paymentRoute");
const notificationRoute = require("./routes/notificationRoute");
const server = http.createServer(app);

app.use("/api", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/client", clientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api", petRoute);
app.use("/api", userRoute);
app.use("/api", appointmentRoute);
app.use("/api", reviewRoute);
app.use("/api", petAppointmentRoute);
app.use("/api", slotRoute);
app.use("/api", chatRoute);
app.use("/api", chatMessageRoute);
app.use("/api", paymentRoute);
app.use("/api", notificationRoute);

// cron jobs
pendingSlotToAvailableCronJob.start();
initateAppointmentReminderCron.start();
initiateMessageNotificationDeleteCron.start();
deleteMeetingNotificationCron.start();
reminder.start();

// multer

const PORT = process.env.PORT || 5000;

const io = initializeSocket(server);

server.listen(PORT, () => {
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

module.exports = { app, io, cron };
