<<<<<<< HEAD
const mongoose = require("mongoose");
const milestoneSchema = new mongoose.Schema(
{
title: { type: String, required: true },
status: {
type: String,
enum: ["pending", "done"],
default: "pending"
},
completedAt: { type: Date, default: null }
},
{ _id: false }
);
const taskSchema = new mongoose.Schema(
{
title: { type: String, required: true, trim: true },
description: { type: String, required: true },
budget: { type: Number, default: 0 },
primarySkill: { type: String, default: "" },
company: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},
assignedStudent: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
default: null
},
status: {
type: String,
enum: ["open", "assigned", "in_progress", "completed"],
default: "open"
},
dueDate: { type: Date, default: null },
milestones: [milestoneSchema]
},
{ timestamps: true }
);
=======
const mongoose = require("mongoose");
const milestoneSchema = new mongoose.Schema(
{
title: { type: String, required: true },
status: {
type: String,
enum: ["pending", "done"],
default: "pending"
},
completedAt: { type: Date, default: null }
},
{ _id: false }
);
const taskSchema = new mongoose.Schema(
{
title: { type: String, required: true, trim: true },
description: { type: String, required: true },
budget: { type: Number, default: 0 },
primarySkill: { type: String, default: "" },
company: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},
assignedStudent: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
default: null
},
status: {
type: String,
enum: ["open", "assigned", "in_progress", "completed"],
default: "open"
},
dueDate: { type: Date, default: null },
milestones: [milestoneSchema]
},
{ timestamps: true }
);
>>>>>>> 28621a65839c4ebf4b6c66460ef02691ed232291
module.exports = mongoose.model("Task", taskSchema);