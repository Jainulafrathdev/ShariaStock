// emailservice.js
const nodemailer = require('nodemailer');

const sendEmail = async (formData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            debug: true,
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send email to the user who filled the form
            subject: `New Message from ${formData.firstName} ${formData.lastName}`,
            text: `Firstname: ${formData.firstName}\nLastname: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error); // Log the specific error
        throw error; // Rethrow the error so it can be caught in the calling function
    }
};

module.exports = sendEmail;
