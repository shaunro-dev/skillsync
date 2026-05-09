const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const { title, description, budget, primarySkill, dueDate } = req.body;
    const task = await Task.create({ title, description, budget, primarySkill, dueDate, company: req.user.id });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyTasks = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "company") {
      filter.company = req.user.id;
    }
    const tasks = await Task.find(filter)
      .populate("assignedStudent", "name profileTitle verifiedScore availability")
      .populate("company", "name companyName")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOpenTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "open" })
      .populate("company", "name companyName")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("company", "name")
      .populate("assignedStudent", "name profileTitle availability");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { taskId, studentId } = req.body;
    const task = await Task.findById(taskId);
    const student = await User.findById(studentId);
    if (!task || !student) return res.status(404).json({ message: "Task or student not found" });
    if (task.company.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized to assign this task" });
    task.assignedStudent = student._id;
    task.status = "assigned";
    await task.save();
    student.availability.status = "busy";
    student.availability.currentTask = task._id;
    student.availability.currentProjectName = task.title;
    student.availability.expectedCompletion = task.dueDate || null;
    student.availability.availableInDays = null;
    await student.save();
    res.json({ message: "Task assigned", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.status = status;
    await task.save();
    if (status === "completed" && task.assignedStudent) {
      const student = await User.findById(task.assignedStudent);
      if (student) {
        student.availability.status = "available";
        student.availability.currentTask = null;
        student.availability.currentProjectName = "";
        student.availability.expectedCompletion = null;
        student.availability.availableInDays = null;
        student.completedTasksCount += 1;
        await student.save();
      }
    }
    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
