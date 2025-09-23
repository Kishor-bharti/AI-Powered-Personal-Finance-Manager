const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const analysisRoutes = require("./routes/analysis");
const goalRoutes = require("./routes/goals");

// Log middleware to debug routes
const logRoutes = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(logRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes); // ✅ plural
app.use("/api/goals", goalRoutes);               // ✅ plural
app.use("/api/analysis", analysisRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));