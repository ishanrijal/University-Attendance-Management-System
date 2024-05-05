const { MongoClient } = require('mongodb');

// Function to verify OTP
const verifyOTP = async function (req, res) {
    const { email, otp } = req.body;

    // Connection URI
    const uri = process.env.MONGO_URI;

    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(uri);
        const db = client.db('attendance-system');
        const sessionsCollection = db.collection('sessions');

        // Find all sessions
        const allSessions = await sessionsCollection.find().toArray();

        // Loop through each session
        for (const session of allSessions) {
            // Parse the session data
            const sessionData = JSON.parse(session.session);

            // Check if the email matches
            if (sessionData.email === email) {
                // Email matches, get the OTP
                const storedOTP = sessionData.otp;

                // Check if OTP matches
                if (otp == storedOTP) {
                    // OTP is valid
                    res.status(200).json({ success: true, email:email });

                    // Remove OTP from session storage
                    await sessionsCollection.deleteOne({ _id: session._id });
                    return; // Exit the function after sending the response
                } else {
                    // Invalid OTP
                    res.status(400).json({ success: false, error: "Invalid OTP. Please try again." });
                    return; // Exit the function after sending the response
                }
            }
        }
        // If no matching session was found, return an error
        res.status(400).json({ success: false, error: "Session data not found or OTP not stored." });

        // Close MongoDB connection
        client.close();
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

module.exports = { verifyOTP };