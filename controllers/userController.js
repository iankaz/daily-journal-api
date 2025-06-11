const User = require("../models/User")
const ResponseHelper = require("../utils/responseHelper")

class UserController {
  /**
   * Get all users (admin only)
   */
  static async getAllUsers(req, res) {
    try {
      const users = await User.find({}, { githubId: 0 }) // Exclude sensitive data
      ResponseHelper.success(res, users)
    } catch (error) {
      console.error("Error fetching users:", error)
      ResponseHelper.error(res, "Failed to fetch users", 500)
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id, { githubId: 0 })
      if (!user) {
        return ResponseHelper.error(res, "User not found", 404)
      }
      ResponseHelper.success(res, user)
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.name === "CastError") {
        return ResponseHelper.error(res, "Invalid user ID", 400)
      }
      ResponseHelper.error(res, "Failed to fetch user", 500)
    }
  }

  /**
   * Update user
   */
  static async updateUser(req, res) {
    try {
      // Only allow updating specific fields
      const allowedUpdates = ["displayName", "email"]
      const updates = Object.keys(req.body)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = req.body[key]
          return obj
        }, {})

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-githubId")

      if (!user) {
        return ResponseHelper.error(res, "User not found", 404)
      }

      ResponseHelper.success(res, user)
    } catch (error) {
      console.error("Error updating user:", error)
      if (error.name === "CastError") {
        return ResponseHelper.error(res, "Invalid user ID", 400)
      }
      if (error.name === "ValidationError") {
        return ResponseHelper.error(res, error.message, 400)
      }
      ResponseHelper.error(res, "Failed to update user", 500)
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return ResponseHelper.error(res, "User not found", 404)
      }
      ResponseHelper.success(res, null, "User deleted successfully")
    } catch (error) {
      console.error("Error deleting user:", error)
      if (error.name === "CastError") {
        return ResponseHelper.error(res, "Invalid user ID", 400)
      }
      ResponseHelper.error(res, "Failed to delete user", 500)
    }
  }
}

module.exports = UserController 