<<<<<<< HEAD
const User = require("../models/User");

exports.updateAvailability = async (req, res) => {
  try {
    const { status, currentProjectName, expectedCompletion, availableInDays } = req.body;

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    user.availability.status = status;

    if (status === "available") {
      user.availability.currentTask = null;
      user.availability.currentProjectName = "";
      user.availability.expectedCompletion = null;
      user.availability.availableInDays = null;
    } else if (status === "busy") {
      user.availability.currentProjectName = currentProjectName || "";
      user.availability.expectedCompletion = expectedCompletion || null;
      user.availability.availableInDays = null;
    } else if (status === "soon") {
      user.availability.currentTask = null;
      user.availability.currentProjectName = "";
      user.availability.expectedCompletion = null;
      user.availability.availableInDays = Number(availableInDays) || null;
    }

    await user.save();

    res.json({
      message: "Availability updated",
      availability: user.availability
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
=======
const User = require("../models/User");

exports.updateAvailability = async (req, res) => {
  try {
    const { status, currentProjectName, expectedCompletion, availableInDays } = req.body;

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    user.availability.status = status;

    if (status === "available") {
      user.availability.currentTask = null;
      user.availability.currentProjectName = "";
      user.availability.expectedCompletion = null;
      user.availability.availableInDays = null;
    } else if (status === "busy") {
      user.availability.currentProjectName = currentProjectName || "";
      user.availability.expectedCompletion = expectedCompletion || null;
      user.availability.availableInDays = null;
    } else if (status === "soon") {
      user.availability.currentTask = null;
      user.availability.currentProjectName = "";
      user.availability.expectedCompletion = null;
      user.availability.availableInDays = Number(availableInDays) || null;
    }

    await user.save();

    res.json({
      message: "Availability updated",
      availability: user.availability
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
>>>>>>> 28621a65839c4ebf4b6c66460ef02691ed232291
