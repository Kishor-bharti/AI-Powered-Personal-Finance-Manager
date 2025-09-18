const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Add transaction
router.post("/add", auth, async (req, res) => {
  const { type, category, amount, date } = req.body;
  try {
    await pool.query(
      "INSERT INTO transactions (user_id, type, category, amount, date) VALUES ($1,$2,$3,$4,$5)",
      [req.user.id, type, category, amount, date]
    );
    res.json({ message: "Transaction added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get transactions
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions WHERE user_id=$1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;