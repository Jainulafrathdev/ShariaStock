// In your server.js or a separate mail.js file

const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services as well
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Your email password (consider using environment variables for security)
  }
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: to, // Recipient address
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
