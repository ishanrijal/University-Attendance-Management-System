const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: true,
    }, 
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    students: [{
        studentId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'pending'],
            default: 'pending',
        },
        remarks: String
    }],
    otp: {
        type: String,
        required: true,
    },
    qrCode: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        required: true,
    }
});

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

module.exports = AttendanceModel;
