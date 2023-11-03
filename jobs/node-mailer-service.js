const nodeMailer = require("nodemailer");
const config = require("../config/config");

const sendEmail = async ({ email, subject, text }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.pass,
      },
      secure: false,
      requireTLS: true,
      port: 587,
    });

    const mailOptions = {
      from: config.email,
      to: email,
      subject: subject,
      html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log("Email sent: " + info.response);
        return info.response;
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = { sendEmail };
