// routes/diaryRoute.js
const express = require("express");
const {
  saveDiaryEntry,
  saveFinalResult,
  getUserData,
  saveUserResults,
} = require("../controllers/diaryController");

const router = express.Router();

/**
 * POST /api/diary/save_entry
 * Save a daily diary entry
 * Body: { user_id: string, day_number: number (1-15), text: string }
 */
router.post("/save_entry", saveDiaryEntry);

/**
 * POST /api/diary/save_result
 * Save the final ML analysis result
 * Body: { user_id: string, result: string }
 */
router.post("/save_result", saveFinalResult);

/**
 * GET /api/diary/get_user_data/:user_id
 * Fetch all diary entries and summary for a user
 * Returns: { diary_entries: {...}, summary: { final_result: {...} } }
 */
router.get("/get_user_data/:user_id", getUserData);

/**
 * POST /api/diary/save_user_results
 * Save all 15 entries + result + timestamp + username into `user_results`
 */
router.post("/save_user_results", saveUserResults);

module.exports = router;

