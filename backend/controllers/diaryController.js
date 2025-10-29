// controllers/diaryController.js
const { admin, db } = require("../firebaseConfig");

/**
 * Save a daily diary entry to Firestore
 * POST /api/diary/save_entry
 * Body: { user_id, day_number, text }
 */
const saveDiaryEntry = async (req, res) => {
  try {
    const { user_id, day_number, text } = req.body;

    // Validate input
    if (!user_id || !day_number || !text) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id, day_number, text",
      });
    }

    // Validate day_number is between 1 and 15
    if (day_number < 1 || day_number > 15) {
      return res.status(400).json({
        success: false,
        message: "day_number must be between 1 and 15",
      });
    }

    // Create entry data with timestamp
    const entryData = {
      text: text.trim(),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      day_number: day_number,
    };

    // Save to Firestore at users/{user_id}/diary_entries/day_X
    const docRef = db
      .collection("users")
      .doc(user_id)
      .collection("diary_entries")
      .doc(`day_${day_number}`);

    await docRef.set(entryData);

    return res.status(200).json({
      success: true,
      message: `Day ${day_number} entry saved successfully`,
      data: {
        user_id,
        day_number,
        saved_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving diary entry:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving diary entry",
      error: error.message,
    });
  }
};

/**
 * Save the final ML result to Firestore
 * POST /api/diary/save_result
 * Body: { user_id, result }
 */
const saveFinalResult = async (req, res) => {
  try {
    const { user_id, result } = req.body;

    // Validate input
    if (!user_id || !result) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id, result",
      });
    }

    // Create result data with timestamp
    const resultData = {
      overall_result: result,
      generated_on: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save to Firestore at users/{user_id}/summary/final_result
    const docRef = db
      .collection("users")
      .doc(user_id)
      .collection("summary")
      .doc("final_result");

    await docRef.set(resultData);

    return res.status(200).json({
      success: true,
      message: "Final result saved successfully",
      data: {
        user_id,
        saved_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving final result:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving final result",
      error: error.message,
    });
  }
};

/**
 * Get user's diary entries and summary from Firestore
 * GET /api/diary/get_user_data/:user_id
 */
const getUserData = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Missing user_id parameter",
      });
    }

    const userRef = db.collection("users").doc(user_id);
    const diaryEntriesRef = userRef.collection("diary_entries");
    const summaryRef = userRef.collection("summary");

    // Fetch diary entries
    const diarySnapshot = await diaryEntriesRef.get();
    const diaryEntries = {};
    
    diarySnapshot.forEach((doc) => {
      const data = doc.data();
      diaryEntries[doc.id] = {
        ...data,
        timestamp: data.timestamp?.toDate?.()?.toISOString() || data.timestamp,
      };
    });

    // Fetch final result
    const summarySnapshot = await summaryRef.doc("final_result").get();
    let finalResult = null;
    
    if (summarySnapshot.exists) {
      const data = summarySnapshot.data();
      finalResult = {
        ...data,
        generated_on: data.generated_on?.toDate?.()?.toISOString() || data.generated_on,
      };
    }

    return res.status(200).json({
      success: true,
      data: {
        user_id,
        diary_entries: diaryEntries,
        summary: {
          final_result: finalResult,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

module.exports = {
  saveDiaryEntry,
  saveFinalResult,
  getUserData,
};

/**
 * Save full 15-day diary, result, timestamp and username into `user_results` collection
 * POST /api/diary/save_user_results
 * Body: { username: string, entries: string[15], result: string, timestamp?: string }
 * Firestore shape (to match console screenshot):
 *   Collection: user_results
 *   Document: auto-id
 *   Fields: 1..15 ("Day X: <text>"), result, timestamp, username
 */
const saveUserResults = async (req, res) => {
  try {
    const { username, entries, result, timestamp } = req.body || {};

    if (!username || !Array.isArray(entries) || entries.length !== 15 || !result) {
      return res.status(400).json({
        success: false,
        message:
          "Required: username, entries[15], result. Optional: timestamp (ISO string)",
      });
    }

    // Prepare document fields 1..15 exactly as seen in the Firestore UI
    const docData = {};
    for (let i = 0; i < 15; i += 1) {
      const dayNumber = i + 1;
      const text = (entries[i] || "").trim();
      docData[dayNumber] = `Day ${dayNumber}: ${text}`;
    }

    docData.result = result;
    docData.username = username;
    docData.timestamp = timestamp || new Date().toISOString();

    await db.collection("user_results").add(docData);

    return res.status(200).json({
      success: true,
      message: "User results saved successfully",
    });
  } catch (error) {
    console.error("Error saving user results:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving user results",
      error: error.message,
    });
  }
};

// Export at bottom to avoid hoisting confusion in older Node settings
module.exports.saveUserResults = saveUserResults;

