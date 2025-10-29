// routes/userRoutes.js
const express = require("express");
const { signUp, login, getProfile, saveMoodResult } = require("../controllers/userController");

const router = express.Router();

// Route for signup
router.post("/signup", signUp);

// Route for login
router.post("/login", login);

// Route for getting user profile
router.get("/profile", getProfile);

// Route for saving mood analysis result to Firestore
router.post("/save-result", saveMoodResult);

module.exports = router;
