const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/authController")

// GET /auth/github - Initiate GitHub OAuth
router.get("/github", AuthController.githubAuth)

// GET /auth/github/callback - Handle GitHub OAuth callback
router.get("/github/callback", AuthController.githubCallback)

// POST /auth/logout - Logout user
router.post("/logout", AuthController.logout)

// GET /auth/user - Get current user information
router.get("/user", AuthController.getCurrentUser)

// GET /auth/token - Get JWT token for authenticated user
router.get("/token", AuthController.getToken)

module.exports = router
