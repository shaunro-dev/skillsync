const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, default: "" }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "company"], required: true },

    profileTitle: { type: String, default: "" },
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    college: { type: String, default: "" },
    avatar: { type: String, default: "" },

    verifiedScore: { type: Number, default: 0 },
    completedTasksCount: { type: Number, default: 0 },

    availability: {
      status: {
        type: String,
        enum: ["available", "busy", "soon"],
        default: "available"
      },
      currentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: null
      },
      currentProjectName: { type: String, default: "" },
      expectedCompletion: { type: Date, default: null },
      availableInDays: { type: Number, default: null }
    },

    reviews: [reviewSchema]
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  this.name = `${this.firstName} ${this.lastName}`.trim();
});

module.exports = mongoose.model("User", userSchema);