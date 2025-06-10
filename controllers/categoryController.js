const Category = require("../models/Category")
const Journal = require("../models/Journal")
const { validateCategory, validateCategoryUpdate } = require("../validation/categoryValidation")

/**
 * Category Controller
 * Handles all category-related operations following MVC pattern
 */
class CategoryController {
  /**
   * Get all categories for authenticated user
   */
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.find({ userId: req.user._id }).sort({ name: 1 })
      res.json(categories)
    } catch (error) {
      console.error("Error fetching categories:", error)
      res.status(500).json({ error: "Failed to fetch categories" })
    }
  }

  /**
   * Get specific category by ID
   */
  static async getCategoryById(req, res) {
    try {
      const category = await Category.findOne({
        _id: req.params.id,
        userId: req.user._id,
      })

      if (!category) {
        return res.status(404).json({ error: "Category not found" })
      }

      res.json(category)
    } catch (error) {
      console.error("Error fetching category:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid category ID" })
      }
      res.status(500).json({ error: "Failed to fetch category" })
    }
  }

  /**
   * Create new category
   */
  static async createCategory(req, res) {
    try {
      const { error, value } = validateCategory(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      const category = new Category({
        ...value,
        userId: req.user._id,
      })

      await category.save()
      res.status(201).json(category)
    } catch (error) {
      console.error("Error creating category:", error)
      if (error.code === 11000) {
        return res.status(400).json({ error: "Category name already exists" })
      }
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: "Failed to create category" })
    }
  }

  /**
   * Update existing category
   */
  static async updateCategory(req, res) {
    try {
      const { error, value } = validateCategoryUpdate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      const category = await Category.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, value, {
        new: true,
        runValidators: true,
      })

      if (!category) {
        return res.status(404).json({ error: "Category not found" })
      }

      res.json(category)
    } catch (error) {
      console.error("Error updating category:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid category ID" })
      }
      if (error.code === 11000) {
        return res.status(400).json({ error: "Category name already exists" })
      }
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: "Failed to update category" })
    }
  }

  /**
   * Delete category
   */
  static async deleteCategory(req, res) {
    try {
      // Check if category has associated journals
      const journalCount = await Journal.countDocuments({
        category: req.params.id,
        userId: req.user._id,
      })

      if (journalCount > 0) {
        return res.status(400).json({
          error: "Cannot delete category with associated journal entries",
        })
      }

      const category = await Category.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      })

      if (!category) {
        return res.status(404).json({ error: "Category not found" })
      }

      res.json({ message: "Category deleted successfully" })
    } catch (error) {
      console.error("Error deleting category:", error)
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid category ID" })
      }
      res.status(500).json({ error: "Failed to delete category" })
    }
  }
}

module.exports = CategoryController
