
const nodemailer = require("nodemailer");

const sendMail = (data) => {
  console.log(data);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user:"niravgorasiya10@gmail.com",
      pass:"nirav7069",
    },
  });
  const mailOptions = {
    from:data.from,
    to: data.to,
    subject: data.sub,
    html: data.html,
    attachments: data.attachments,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // else {
    //   console.log("Email sent: " + info.response);
    // }
  });
};

module.exports.sendMail = sendMail;