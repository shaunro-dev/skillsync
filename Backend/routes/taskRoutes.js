const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createTask,
  getCompanyTasks,
  getTaskById,
  assignTask,
  updateTaskStatus
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("company"), createTask);
router.get("/", authMiddleware, getCompanyTasks);
router.get("/open", authMiddleware, require("../controllers/taskController").getOpenTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/assign", authMiddleware, roleMiddleware("company"), assignTask);
router.put("/:id/status", authMiddleware, roleMiddleware("company"), updateTaskStatus);

module.exports = router;