const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // await transporter.sendMail(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to: " + options.email);
  } catch (error) {
    console.log("---------- EMAIL ERROR ----------");
    console.log(error); // This will print the exact error in your terminal
    console.log("---------------------------------");
    throw error; // Stop the function so the frontend knows it failed
  }


  
};

module.exports = sendEmail;