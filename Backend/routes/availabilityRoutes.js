const express = require("express");
const { updateAvailability } = require("../controllers/availabilityController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


router.patch("/", authMiddleware, roleMiddleware("student"), updateAvailability);
module.exports = router;

