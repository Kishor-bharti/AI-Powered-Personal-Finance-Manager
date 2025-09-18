const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Add goal
router.post("/add", auth, async (req, res) => {
  const { goal_name, target_amount, deadline } = req.body;
  try {
    await pool.query(
      "INSERT INTO goal (user_id, goal_name, target_amount, deadline, status) VALUES ($1,$2,$3,$4,'ongoing')",
      [req.user.id, goal_name, target_amount, deadline]
    );
    res.json({ message: "Goal added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get goals
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM goals WHERE user_id=$1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;