const Message = require("../models/Message");
const Task = require("../models/Task");
const User = require("../models/User");

// Middleware-like check function to ensure user is part of the task
async function checkTaskAccess(taskId, userId) {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.company.toString() !== userId && (!task.assignedStudent || task.assignedStudent.toString() !== userId)) {
    throw new Error("Forbidden");
  }
  return task;
}

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, taskId, content } = req.body;
    await checkTaskAccess(taskId, req.user.id);
    
    // Validate receiver is part of the task
    const task = await Task.findById(taskId);
    if (task.company.toString() !== receiver && task.assignedStudent.toString() !== receiver) {
      return res.status(403).json({ message: "Invalid receiver for this task" });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver,
      taskId,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(error.message === "Forbidden" ? 403 : 500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { taskId } = req.params;
    await checkTaskAccess(taskId, req.user.id);

    const messages = await Message.find({ taskId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(error.message === "Forbidden" ? 403 : 500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { taskId } = req.params;
    await checkTaskAccess(taskId, req.user.id);

    await Message.updateMany(
      { taskId, receiver: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(error.message === "Forbidden" ? 403 : 500).json({ message: error.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    // Find all tasks where the user is either the company or the assigned student
    const filter = req.user.role === "company" 
      ? { company: req.user.id, assignedStudent: { $ne: null } }
      : { assignedStudent: req.user.id };

    const tasks = await Task.find(filter)
      .populate("company", "name companyName avatar")
      .populate("assignedStudent", "name firstName lastName avatar");

    const conversations = await Promise.all(tasks.map(async (task) => {
      const lastMessage = await Message.findOne({ taskId: task._id }).sort({ createdAt: -1 });
      const unreadCount = await Message.countDocuments({ taskId: task._id, receiver: req.user.id, read: false });
      
      const otherUser = req.user.role === "company" ? task.assignedStudent : task.company;
      
      return {
        task: {
          _id: task._id,
          title: task.title,
        },
        otherUser: {
          _id: otherUser._id,
          name: otherUser.name || (otherUser.companyName || otherUser.firstName + " " + otherUser.lastName)
        },
        lastMessage,
        unreadCount
      };
    }));

    // Sort by most recent message
    conversations.sort((a, b) => {
      const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
