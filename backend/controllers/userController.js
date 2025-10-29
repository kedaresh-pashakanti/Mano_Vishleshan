// controllers/userController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { admin, db } = require("../firebaseConfig");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password,
    });

    // Save user to DB
    await user.save();

    // Generate token and send response
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in signing up user" });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate token and send response
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in logging in user" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const user = await User.findById(userId).select("name email"); // Only select name and email

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Save mood analysis result to Firestore
const saveMoodResult = async (req, res) => {
  try {
    const { username, diaryEntries, finalResult } = req.body;

    // Validate required fields
    if (!username || !diaryEntries || !finalResult) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: username, diaryEntries, and finalResult are required",
      });
    }

    // Validate diaryEntries is an array with 15 entries
    if (!Array.isArray(diaryEntries) || diaryEntries.length !== 15) {
      return res.status(400).json({
        success: false,
        message: "diaryEntries must be an array with exactly 15 entries",
      });
    }

    // Validate finalResult is not empty
    if (typeof finalResult !== 'string' || finalResult.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "finalResult must be a non-empty string",
      });
    }

    // Create document data for Firestore
    const resultData = {
      username: username.trim(),
      entries: diaryEntries,
      result: finalResult.trim(),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save to Firestore collection "user_results"
    const docRef = await db.collection("user_results").add(resultData);

    return res.status(200).json({
      success: true,
      message: "Mood analysis result saved successfully",
      data: {
        documentId: docRef.id,
        username: username,
        entriesCount: diaryEntries.length,
        savedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error("Error saving mood result:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving mood analysis result",
      error: error.message,
    });
  }
};

module.exports = { signUp, login, getProfile, saveMoodResult };
