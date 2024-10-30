const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
// const sendEmail = require('./emailservice'); // Import sendEmail
const cors = require('cors');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);

// app.post('/api/contact', async (req, res) => {
//   try {
//     await sendEmail(req.body);
//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ message: 'Failed to send email.' });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
