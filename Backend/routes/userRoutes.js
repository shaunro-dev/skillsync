<<<<<<< HEAD
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
=======
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
>>>>>>> 28621a65839c4ebf4b6c66460ef02691ed232291
module.exports = router;