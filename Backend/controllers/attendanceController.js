const qr = require('qrcode');
const Session = require('../models/session'); // Import the Session model
const { MongoClient } = require('mongodb');

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
          moduleCode: req.query.moduleCode,
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
    console.log(req.params);
    console.log(req.query);
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
