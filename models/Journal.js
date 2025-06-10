const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ["very-happy", "happy", "neutral", "sad", "very-sad", "anxious", "excited", "grateful"],
    required: true,
  },
  weather: {
    type: String,
    enum: ["sunny", "cloudy", "rainy", "snowy", "stormy", "foggy", "windy"],
    default: "sunny",
  },
  tags: [
    {
      type: String,
      trim: true,
      maxlength: 50,
    },
  ],
  isPrivate: {
    type: Boolean,
    default: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

journalSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

journalSchema.index({ userId: 1, date: -1 })
journalSchema.index({ userId: 1, category: 1 })

module.exports = mongoose.model("Journal", journalSchema)
