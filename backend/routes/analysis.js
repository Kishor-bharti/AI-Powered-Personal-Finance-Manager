const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

// Just returns dummy insights for now
router.get("/", auth, async (req, res) => {
  res.json({
    insights: "You spend 40% of your income on food. Try reducing by 15% to save ₹2000/month.",
    suggestion: "Invest surplus in index funds for long-term growth."
  });
});

module.exports = router;