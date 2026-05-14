const User = require("../models/User");

/**
 * Updates a student's availability status and associated project metadata.
 * Logic handles three states: available, busy, and soon.
 */
exports.updateAvailability = async (req, res) => {
  try {
    const { status, currentProjectName, expectedCompletion, availableInDays } = req.body;

    // Verify user existence and role
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    // Set the base status
    user.availability.status = status;

    // Logic Fix: Clear or set specific fields based on the selected status
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
      // Ensure availableInDays is stored as a valid number
      user.availability.availableInDays = Number(availableInDays) || null;
    }

    // Save updated student profile to MongoDB
    await user.save();

    res.json({
      message: "✅ Availability updated successfully",
      availability: user.availability
    });
  } catch (error) {
    // Catch database or validation errors
    res.status(500).json({ message: error.message });
  }
};