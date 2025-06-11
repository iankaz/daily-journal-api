const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const requireAuth = require("../middleware/auth")

// All routes require authentication
router.use(requireAuth)

// GET /api/users - Get all users
router.get("/", UserController.getAllUsers)

// GET /api/users/:id - Get specific user
router.get("/:id", UserController.getUserById)

// PUT /api/users/:id - Update user
router.put("/:id", UserController.updateUser)

// DELETE /api/users/:id - Delete user
router.delete("/:id", UserController.deleteUser)

module.exports = router 