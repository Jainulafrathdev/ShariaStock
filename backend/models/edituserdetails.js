const { default: mongoose } = require("mongoose");

const EditProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'edit-profile' });


module.exports = mongoose.model('EditProfile', EditProfileSchema);
