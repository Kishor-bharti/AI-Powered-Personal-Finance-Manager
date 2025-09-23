const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Goals route is working" });
});

// Add goal
router.post("/", auth, async (req, res) => {
  const { goal_name, target_amount, deadline } = req.body;
  try {
    console.log('Creating goal:', { goal_name, target_amount, deadline });
    const result = await pool.query(
      `INSERT INTO goals (user_id, goal_name, target_amount, deadline, status, current_amount) 
       VALUES ($1, $2, $3, $4, 'in_progress', 0) 
       RETURNING goal_id, goal_name, target_amount, deadline, status, current_amount, created_at`,
      [req.user.id, goal_name, target_amount, deadline]
    );
    console.log('Goal created:', result.rows[0]);
    res.status(201).json(result.rows[0]);
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

// Update goal progress
router.patch("/:id/progress", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // First, check if the goal exists and belongs to the user
    const checkGoal = await pool.query(
      "SELECT * FROM goals WHERE goal_id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (checkGoal.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    const goal = checkGoal.rows[0];
    const newAmount = parseFloat(goal.current_amount) + parseFloat(amount);
    const newStatus = newAmount >= goal.target_amount ? 'completed' : 'in_progress';

    // Update the goal's current amount and status
    const result = await pool.query(
      `UPDATE goals 
       SET current_amount = $1, status = $2
       WHERE goal_id = $3 AND user_id = $4
       RETURNING goal_id, goal_name, target_amount, deadline, status, current_amount, created_at`,
      [newAmount, newStatus, id, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating goal progress:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;