const User = require("../models/User");
const Task = require("../models/Task");

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("availability.currentTask", "title status dueDate");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const { profileTitle, bio, description, skills, college, avatar } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileTitle = profileTitle ?? user.profileTitle;
    user.bio = bio ?? user.bio;
    user.description = description ?? user.description;
    user.skills = skills ?? user.skills;
    user.college = college ?? user.college;
    user.avatar = avatar ?? user.avatar;

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { skill, status, sort } = req.query;

    const filter = { role: "student" };

    if (status) {
      filter["availability.status"] = status;
    }

    let students = await User.find(filter).select("-password");

    if (skill) {
      students = students.filter((student) =>
        student.skills.some((s) =>
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    if (sort === "score") {
      students.sort((a, b) => b.verifiedScore - a.verifiedScore);
    }

    if (sort === "recently-available") {
      students.sort((a, b) => {
        if (a.availability.status === "available" && b.availability.status !== "available") return -1;
        if (a.availability.status !== "available" && b.availability.status === "available") return 1;
        return 0;
      });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .select("-password")
      .populate("reviews.company", "name");

    const tasks = await Task.find({
      assignedStudent: req.params.id
    }).populate("company", "name companyName");

    res.json({ student, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};