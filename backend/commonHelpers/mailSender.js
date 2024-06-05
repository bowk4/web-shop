const nodemailer = require("nodemailer");

module.exports = async (subscriberMail, letterSubject, letterHtml, res) => {
  //authorization for sending email
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD

    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: subscriberMail,
    subject: letterSubject,
    html: letterHtml
  };

  const result = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return result;
};
