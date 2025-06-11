const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    mood: {
      type: String,
      required: [true, "Mood is required"],
      enum: {
        values: ["happy", "sad", "angry", "neutral", "excited", "anxious"],
        message: "Invalid mood value",
      },
    },
    weather: {
      type: String,
      required: [true, "Weather is required"],
      enum: {
        values: ["sunny", "cloudy", "rainy", "snowy", "windy", "stormy"],
        message: "Invalid weather value",
      },
    },
    tags: [{
      type: String,
      trim: true
    }],
    isPrivate: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
journalSchema.index({ userId: 1, date: -1 })

const Journal = mongoose.model("Journal", journalSchema)

module.exports = Journal
