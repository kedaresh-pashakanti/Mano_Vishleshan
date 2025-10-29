// firebaseConfig.js
const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin SDK safely
let db;

try {
  // Check if Firebase app is already initialized
  if (!admin.apps.length) {
    // Get the path to the Firebase service account key file
    const serviceAccountPath = path.resolve(__dirname, "firebase-key.json");
    
    // Load the service account key
    const serviceAccount = require(serviceAccountPath);
    
    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log("✅ Firebase Admin SDK initialized successfully");
  } else {
    console.log("✅ Firebase Admin SDK already initialized");
  }
  
  // Get Firestore database instance
  db = admin.firestore();
  
} catch (error) {
  console.error("❌ Error initializing Firebase Admin SDK:", error.message);
  console.error("Please ensure firebase-key.json exists in the backend directory");
  
  // Set db to null to prevent further Firebase operations
  db = null;
}

// Export both admin and db instances
module.exports = {
  admin,
  db,
};
