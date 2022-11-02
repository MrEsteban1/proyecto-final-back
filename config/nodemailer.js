const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const setMailOptions = (
  email,
  text = "desed nodemailer",
  subject = "Mensaje desde Nodemailer"
) => {
  return {
    from: "Remitente",
    to: email,
    subject: subject,
    text: text,
  };
};

const sendEmail = async (email, text, subject, res) => {
  const resultado = false;
  const mailOptions = setMailOptions(email, text, subject);
  try {
    let response = await transporter.sendMail(mailOptions);
    res.send("Enviado");
    console.log(response);
  } catch (error) {
    res.send("No Enviado");
    resultado = true;
    console.log(error);
  }
};

module.exports = sendEmail;
