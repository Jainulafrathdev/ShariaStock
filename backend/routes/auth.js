const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const ContactUs = require('../models/contactusdetails');
const sendEmail = require('../emailservice');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, email: user.email });
});

// Edit Profile Route
router.put('/edit-profile/:email', async (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, address, contactNumber, city, state, password } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { firstName, lastName, address, contactNumber, city, state, password }, // Ensure password is hashed if updated
            { new: true }
        );
        res.json({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile.' });
    }
});

// Forgot Password Route
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'umar.zangroups@gmail.com',
        pass: 'fbpo tnrk yaqr uvgz',
    },
  });
  
  // Forgot Password Route
  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
  
        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
  
        // Hash the token and set expiration (1 hour)
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  
        // Update user with the reset token and expiration
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();
  
        // Send the reset link via email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) requested a password reset. Click the link to reset your password: \n\n ${resetUrl}`;
        
        await transporter.sendMail({
            to: email,
            subject: 'Password Reset Request',
            text: message,
        });
  
        res.status(200).json({ msg: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
  });
// // Reset Password Route
// router.post('/reset-password/:token', async (req, res) => {
//     const { password } = req.body;
  
//     try {
//         // Hash the incoming token and find the user with the matching reset token and check if it's not expired
//         const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
//         const user = await User.findOne({
//             resetPasswordToken,
//             resetPasswordExpire: { $gt: Date.now() }, // Make sure the token is not expired
//         });
  
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid or expired token' });
//         }
  
//         // Hash the new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
  
//         // Reset the token and expiration fields
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
  
//         await user.save();
  
//         res.status(200).json({ msg: 'Password reset successful' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Server error' });
//     }
//   });

// Contact Us Route
router.post('/contact-us', async (req, res) => {
    const request = req.body;
    
    // Create the formdata object from the request
    const formdata = {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        message: request.message
    };

    try {
        // Create a new contact entry and save it to the database
        const contactEntry = new ContactUs(formdata);
        const savedEntry = await contactEntry.save(); // Save to the database and get the saved entry
        
        // Send email using the saved entry
        await sendEmail(savedEntry); 
        
        // Return the saved entry as a response
        res.status(200).json({ message: 'Contact details saved successfully and email sent!', data: savedEntry });
    } catch (error) {
        console.error('Error saving contact details or sending email:', error);
        res.status(500).json({ message: 'Error saving contact details or sending email.' });
    }
});
// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
  
    try {
        // Hash the incoming token and find the user with the matching reset token and check if it's not expired
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // Make sure the token is not expired
        });
  
        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }
  
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        // Reset the token and expiration fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
  });
  router.get('/user/:email', async (req, res) => {
      const { email } = req.params;
      try {
          const user = await User.findOne({ email });
          if (!user) return res.status(404).json({ msg: 'User not found' });
          
          // Return user data without password
          const { password, ...userData } = user._doc; // Exclude password from response
          res.status(200).json(userData);
      } catch (error) {
          res.status(500).send('Server error');
      }
  });
  
  // Update User Data Route
  // Update User Route
  // Example of the updateUserData function
  router.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const { name, contactNumber, doorNumber, streetName, city, country, pincode } = req.body;
  
      try {
          // Update the user data
          const user = await User.findOneAndUpdate(
              { email },
              { name, contactNumber, doorNumber, streetName, city, country, pincode },
              { new: true } // Return the updated document
          );
  
          if (!user) return res.status(404).json({ msg: 'User not found' });
  
          res.json({
              msg: 'User updated successfully',
              user: {
                  name: user.name,
                  email: user.email,
                  contactNumber: user.contactNumber,
                  doorNumber: user.doorNumber,
                  streetName: user.streetName,
                  city: user.city,
                  country: user.country,
                  pincode: user.pincode,
              }
          });
      } catch (error) {
          console.error(error);
          res.status(500).send('Server error');
      }
  });
  
  // Configure multer storage
  const storage = multer.diskStorage({
      destination: './uploads/profilePictures',  // Specify the upload directory
      filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
      }
  });
  
  const upload = multer({ storage });
  // Route to upload profile picture
  router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
      try {
          const email = req.body.email;
          const user = await User.findOne({ email });
          if (!user) return res.status(404).json({ msg: 'User not found' });
  
          user.profilePicture = req.file.path;  // Save the file path to profilePicture
          await user.save();
  
          res.json({ msg: 'Profile picture uploaded successfully', profilePicture: user.profilePicture });
      } catch (error) {
          console.error(error);
          res.status(500).send('Server error');
      }
  });



module.exports = router;
