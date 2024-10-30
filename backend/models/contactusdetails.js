const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
},{ collection: 'contactus-form' });

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;
