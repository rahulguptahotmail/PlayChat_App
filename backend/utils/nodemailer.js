const nodemailer = require("nodemailer");

const sendingMail = (receiver, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.LESS_SECURE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: receiver,
      subject: "Play Chat",
      text: `WELCOME to You!🙏🙏🙏 in Play Chat Application You can register through a OTP 👉 ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    throw Error;
  }
};

module.exports = sendingMail;
