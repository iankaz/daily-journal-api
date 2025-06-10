const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  color: {
    type: String,
    default: "#3B82F6",
    match: /^#[0-9A-F]{6}$/i,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
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

categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

categorySchema.index({ userId: 1, name: 1 }, { unique: true })

module.exports = mongoose.model("Category", categorySchema)
