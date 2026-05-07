const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
getMyProfile,
updateMyProfile,
getStudents,
getStudentProfile
} = require("../controllers/userController");
const router = express.Router();
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, roleMiddleware("student"), updateMyProfile);
router.get("/students", authMiddleware, getStudents);
router.get("/students/:id", authMiddleware, getStudentProfile);
module.exports = router;