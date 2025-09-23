const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Add transaction
router.post("/add", auth, async (req, res) => {
  const { type, category, amount, date, payment_method, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (user_id, type, category, amount, date, payment_method, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING txn_id, user_id, type, category, amount, date, payment_method, description`,
      [req.user.id, type, category, amount, date, payment_method, description]
    );
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      throw new Error("Failed to create transaction");
    }
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

// Error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("Route Error:", error);
    res.status(500).json({ error: error.message });
  });
};

// Get transactions with filters
router.get("/", auth, async (req, res) => {
  try {
    console.log("Fetching transactions for user:", req.user.id);
    const { startDate, endDate, category, type } = req.query;
    let query = `
      SELECT txn_id, user_id, type, category, amount, date, payment_method, description 
      FROM transactions 
      WHERE user_id=$1`;
    const params = [req.user.id];
    let paramCount = 1;

    if (startDate) {
      paramCount++;
      query += ` AND date >= $${paramCount}`;
      params.push(startDate);
    }
    if (endDate) {
      paramCount++;
      query += ` AND date <= $${paramCount}`;
      params.push(endDate);
    }
    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }
    if (type) {
      paramCount++;
      query += ` AND type = $${paramCount}`;
      params.push(type);
    }

    query += " ORDER BY date DESC, txn_id DESC";
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, date, payment_method, description } = req.body;
    
    const result = await pool.query(
      `UPDATE transactions 
       SET type=$1, category=$2, amount=$3, date=$4, payment_method=$5, description=$6 
       WHERE txn_id=$7 AND user_id=$8 
       RETURNING txn_id, user_id, type, category, amount, date, payment_method, description`,
      [type, category, amount, date, payment_method, description, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM transactions 
       WHERE txn_id=$1 AND user_id=$2 
       RETURNING txn_id`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;