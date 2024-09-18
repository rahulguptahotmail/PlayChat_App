const nodemailer = require("nodemailer");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const supportHandler = async (req, res) => {
  const { name, email, message, token } = req.body;

  // veryfying token
  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const user = await userModel.findById(id);

  // user replying

  setTimeout(() => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.LESS_SECURE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: user.email,
      subject: "Play Chat Support ",
      text: `Hello Mr. ${name}Thank You to Send You Opinion. Your Problem is Solve as soon as possible.`,
    };

    transporter.sendMail(mailOptions);
  }, 5000);

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
      to: process.env.GMAIL,
      subject: "Play Chat Support from " + user.email,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res
          .status(error)
          .json({ message: "Error while sending", success: false });
      } else {
        res.status(200).json({ message: "OK", success: true });
      }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { supportHandler };
