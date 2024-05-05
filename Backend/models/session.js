const mongoose = require('mongoose');

// Define the schema for the Session model
const sessionSchema = new mongoose.Schema({
    moduleCode: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Session model using the schema
const Session = mongoose.model('Session', sessionSchema);

// Export the Session model
module.exports = Session;
