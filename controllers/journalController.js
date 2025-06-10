const Journal = require("../models/Journal")
const Category = require("../models/Category")
const { validateJournal, validateJournalUpdate } = require("../validation/journalValidation")

/**
 * Journal Controller
 * Handles all journal-related operations following MVC pattern
 */
class JournalController {
  /**
   * Get all journals for authenticated user with pagination and filtering
   */
  static async getAllJournals(req, res) {
    try {
      const { page = 1, limit = 10, category, mood, startDate, endDate } = req.query
      const filter = { userId: req.user._id }

      // Apply filters
      if (category) filter.category = category
      if (mood) filter.mood = mood
      if (startDate || endDate) {
        filter.date = {}
        if (startDate) filter.date.$gte = new Date(startDate)
        if (endDate) filter.date.$lte = new Date(endDate)
      }

      const journals = await Journal.find(filter)
        .populate("category", "name color")
        .sort({ date: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)

      const total = await Journal.countDocuments(filter)

      res.json({
        journals,
        totalPages: Math.ceil(total / limit),
        currentPage: Number.parseInt(page),
        total,
      })
    } catch (error) {
      console.error("Error fetching journals:", error)
      res.status(500).json({ error: "Failed to fetch journals" })
    }
  }

  /**
   * Get specific journal by ID
   */
  static async getJournalById(req, res) {
    try {
      const journal = await Journal.findOne({
        _id: req.params.id,
        userId: req.user._id,
      }).populate("category", "name color")

      if (!journal) {
        return res.status(404).json({ error: "Journal not found" })
      }

      res.json(journal)
    } catch (error) {
      console.error("Error fetching journal:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid journal ID" })
      }
      res.status(500).json({ error: "Failed to fetch journal" })
    }
  }

  /**
   * Create new journal entry
   */
  static async createJournal(req, res) {
    try {
      const { error, value } = validateJournal(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      // Verify category belongs to user
      const category = await Category.findOne({
        _id: value.category,
        userId: req.user._id,
      })

      if (!category) {
        return res.status(400).json({ error: "Invalid category" })
      }

      const journal = new Journal({
        ...value,
        userId: req.user._id,
      })

      await journal.save()
      await journal.populate("category", "name color")

      res.status(201).json(journal)
    } catch (error) {
      console.error("Error creating journal:", error)
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: "Failed to create journal" })
    }
  }

  /**
   * Update existing journal entry
   */
  static async updateJournal(req, res) {
    try {
      const { error, value } = validateJournalUpdate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      // Verify category belongs to user if provided
      if (value.category) {
        const category = await Category.findOne({
          _id: value.category,
          userId: req.user._id,
        })

        if (!category) {
          return res.status(400).json({ error: "Invalid category" })
        }
      }

      const journal = await Journal.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, value, {
        new: true,
        runValidators: true,
      }).populate("category", "name color")

      if (!journal) {
        return res.status(404).json({ error: "Journal not found" })
      }

      res.json(journal)
    } catch (error) {
      console.error("Error updating journal:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid journal ID" })
      }
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: "Failed to update journal" })
    }
  }

  /**
   * Delete journal entry
   */
  static async deleteJournal(req, res) {
    try {
      const journal = await Journal.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      })

      if (!journal) {
        return res.status(404).json({ error: "Journal not found" })
      }

      res.json({ message: "Journal deleted successfully" })
    } catch (error) {
      console.error("Error deleting journal:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid journal ID" })
      }
      res.status(500).json({ error: "Failed to delete journal" })
    }
  }
}

module.exports = JournalController
