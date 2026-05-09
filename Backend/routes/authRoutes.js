<<<<<<< HEAD
const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

=======
const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

>>>>>>> 28621a65839c4ebf4b6c66460ef02691ed232291
module.exports = router;