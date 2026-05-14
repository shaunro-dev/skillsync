const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// --- UPDATED CORS FOR DEPLOYMENT ---
const allowedOrigins = [
  "http://localhost:5500", 
  "http://127.0.0.1:5500",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true
}));
// ----------------------------------

app.use(express.json());

app.get("/", (req, res) => res.send("SkillSync API running"));

// Route Middlewares
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

const PORT = process.env.PORT || 5000;

// Binding to 0.0.0.0 is essential for Render/Cloud deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});