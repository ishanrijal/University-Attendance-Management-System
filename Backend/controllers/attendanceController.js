const qr = require('qrcode');
const Session = require('../models/session'); // Import the Session model
const { MongoClient } = require('mongodb');
const AttendanceModel = require('../models/attendance');
const ClassModel = require('../models/class');
const UserModel = require('../models/user');

exports.createAttendance = async (req, res) => {
  const otp = generateOTP()
  const {teacherID, moduleCode} = req.body.params

  try{
    const teacher = await UserModel.findOne({
      regNumber: teacherID,
      role: 'teacher'
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }
    const existingClass = await ClassModel.findOne({
      classCode: moduleCode,
    });
    if (!existingClass) {
      return res.status(404).json({ error: 'Class not found.' });
    }
    
    const ongoingAttendance = await AttendanceModel.findOne({
      teacherId: teacher._id,
      classId: existingClass._id,
      status: 'pending'
    })

    if(ongoingAttendance ){
      return res.status(400).json({ error: 'Attendance already started, Please close previous attendance to start new. ' })
    }

    const attendanceObj = {
      classId: existingClass._id,
      teacherId: teacher._id,
      otp: otp,
      date: new Date(),
      status: 'pending',
    }

      // students: existingClass.students.map((students) => {
      //   return {
      //     studentId: students._id,
      //     status: 'pending',
      //   } 
      // })

    const attendance = new AttendanceModel(attendanceObj)

    const qrCode = await qr.toDataURL(attendance.toString())

    attendance.qrCode = qrCode

    await attendance.save()  

    res.status(200).json({ attendance, message: 'QR code generated successfully' })
  }catch(err) {
    console.log("Error")
    res.status(500).json({ error: 'QR code generation failed' })
  }
}

exports.closeAttendance = async (req, res) => {;
  try{
    const {classId, teacherId, attendanceId} = req.body

    if(!teacherId || !classId || !attendanceId){
      return res.status(400).json({ error: 'Please provide all the required fields: teacherId, classId, attendanceId' })
    }

    let attendance = await AttendanceModel.findById(attendanceId)

    if(!attendance){
      return res.status(404).json({ error: 'Attendance not found' })
    }
    if(!attendance.status === 'complete'){
      return res.status(404).json({ error: 'Attendance is already closed!' })
    }

    const existingClass = await ClassModel.findOne({
      classCode: classId,
    });
   
    if(attendance.classId.toString() !== existingClass._id.toString()){
      return res.status(404).json({ error: 'This attendance doenot belong to this class' })
    }

    const teacher = await UserModel.findOne({
      regNumber: teacherId,
      role: 'teacher'
    });

    if(attendance.teacherId.toString() !== teacher._id.toString()){
      return res.status(404).json({ error: 'You are not authorized to close this attendance' })
    }

    attendance.status = 'complete'
    attendance.students = attendance.students.map((student) => {
      return {
        studentId: student.studentId,
        status: student.status === 'pending' ? 'absent' : student.status,
        remark: student.remark
      }
    })
    await attendance.save()    
    res.status(200).json({ attendance, message: 'Attendance has been successfully closed!' })
  }catch(err) {
    res.status(500).json({ error: 'Failed to close attendance, Something went wrong!' })
  }
}

exports.getMyQR = async (req, res) => {
  try{
    const {classId, studentId} = req.body

    if(!classId || !studentId){
      return res.status(400).json({ error: 'Please provide all the required fields: classId, studentId' })
    }

    const student = await UserModel.findById(studentId)

    if(!student){
      return res.status(404).json({ error: 'Student not found' })
    }

    const cls = await ClassModel.findById(classId)

    if(!cls){
      return res.status(404).json({ error: 'Class not found' })
    }

    let attendance = await AttendanceModel.findOne({
      classId: classId,
      status: 'pending'
    })

    if(!attendance){
      return res.status(404).json({ error: 'Attendance may be already closed!' })
    }
    res.status(200).json({ qrCode: attendance.qrCode, id: attendance._id, otp:attendance.otp })

  }catch {
    res.status(500).json({ error: 'Something went wrong!' })
  }
}

exports.getGeneratedQR = async (req, res) => {
  try{
    const { attendanceId } = req.query

    if( ! attendanceId ){
      return res.status(400).json({ error: 'No attendance Session...' })
    }

    let attendance = await AttendanceModel.findById( attendanceId );

    if( attendance.status == "complete" ){
      return res.status(200).json({ status: "complete" })
    }

    if( attendance.status == "pending" ){
      return res.status(200).json({ status: "pending" })
    }

  }catch {
    res.status(500).json({ error: 'Something went wrong!' })
  }
}


exports.updateMyAttendance = async (req, res) => {
  try{
    const { studentId, attendanceId, otp} = req.body 

    if(!attendanceId || !studentId || !otp){
      return res.status(400).json({ error: 'Please provide all the required fields: attendanceId, studentId, otp' })
    }

    const student = await UserModel.findById(studentId)

    if(!student){
      return res.status(404).json({ error: 'Student not found' })
    }

    let attendance = await AttendanceModel.findById(attendanceId)

    if(!attendance){
      return res.status(404).json({ error: 'Attendance not found' })
    }

    if(attendance.status === 'complete'){
      return res.status(404).json({ error: 'Attendance is already closed!' })
    }

    if(attendance.otp !== otp){
      return res.status(404).json({ error: 'Invalid OTP, Please try agian later!' })
    }

    // Push a new student object into the students array
    attendance.students.push({
      studentId: studentId,
      status: 'present',
      remarks: ''
    });
    
    await attendance.save()

    res.status(200).json({ attendance, message: 'Attendance updated successfully' })


  }catch (error) {
    res.status(500).json({ error: 'Something went wrong!' })
  }
}

exports.getMyAttendanceList = async (req, res) => {
  const studentId =req.query.studentId
  try {
      const student = await UserModel.findById( studentId )

      if(!student){
        return res.status(404).json({ error: 'Student not found' })
      }
      const fullName = `${student.firstName} ${student.lastName}`

      AttendanceModel.find({'students.studentId': studentId})
      .then(attendanceRecords => {
        if (!attendanceRecords || attendanceRecords.length === 0) {
          console.log('No attendance records found for student ID:', studentId);
          return;
        }
        res.status(200).json({records: attendanceRecords, studentName: fullName });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get attendance list' });
    }
}

exports.getStudentAttendanceList = async (req, res) => {
  const teacherId =req.query.teacherId
  try {
      const teacher = await UserModel.findById( teacherId )

      if(!teacher){
        return res.status(404).json({ error: 'Teacher not found' })
      }

      AttendanceModel.find({'teacherId': teacherId})
      .then(attendanceRecords => {
        if (!attendanceRecords || attendanceRecords.length === 0) {
          console.log('No attendance records found for student ID:', studentId);
          return;
        }
        res.status(200).json({records: attendanceRecords });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get attendance list' });
    }
}


/* My OLD Code */
exports.generateQR = async (req, res) => {
  const sessionInfo = generateOTP(); // Customize as needed
  const uri = process.env.MONGO_URI;

  try {
      // Connect to MongoDB
      const client = await MongoClient.connect(uri);
      const db = client.db('attendance-system');
      const sessionsCollection = db.collection('sessions');
    
      // Convert sessionInfo to QR code
      const qrCode = await qr.toDataURL(sessionInfo.toString());

      // Create a new session document
      const session = new Session({
          classId: req.query.classId,
          qrCode: qrCode,
          createdAt: new Date()
      });
  
      // Save the session data in the MongoDB collection
      await sessionsCollection.insertOne(session);

      // Close the MongoDB connection
      client.close();

      // Send a success response with the QR code
      res.status(200).json({ qrCode, message: 'Session started successfully',session });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'QR code generation failed' });
  }
};


exports.removeSession = async (req, res) => {
  try {
    const { moduleCode, classId } = req.params;
    const uri = process.env.MONGO_URI;

    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db('attendance-system');
    const sessionsCollection = db.collection('sessions');

    // Remove session based on moduleCode and classId
    const result = await sessionsCollection.deleteOne({ moduleCode, classId });
    
    // Close the MongoDB connection
    client.close();

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Session not found' });
    } else {
      res.status(200).json({ message: 'Session removed successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to remove session' });
  }
};

function generateOTP() {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    return otp.toString(); // Convert OTP to string
}
