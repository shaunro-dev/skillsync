const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// --- UPDATED CORS SECTION ---
app.use(cors({ 
  origin: [
    "http://localhost:5500", 
    "http://127.0.0.1:5500",
    process.env.CLIENT_URL // Keeps your .env setting active too
  ].filter(Boolean) // Removes empty values if CLIENT_URL isn't set
}));
// ----------------------------

app.use(express.json());

app.get("/", (req, res) => res.send("SkillSync API running"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));