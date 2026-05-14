const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createTask,
  getCompanyTasks,
  getTaskById,
  assignTask,
  updateTaskStatus,
  getOpenTasks
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.post("/", authMiddleware, roleMiddleware("company"), createTask);
router.get("/", authMiddleware, getCompanyTasks);
router.get("/open", authMiddleware, getOpenTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/assign", authMiddleware, roleMiddleware("company"), assignTask);
router.put("/:id/status", authMiddleware, roleMiddleware("company"), updateTaskStatus);

module.exports = router;