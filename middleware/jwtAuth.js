const JwtHelper = require("../utils/jwtHelper")
const User = require("../models/User")
const ResponseHelper = require("../utils/responseHelper")

/**
 * JWT Authentication Middleware
 * Protects routes using JWT authentication
 */
const jwtAuth = async (req, res, next) => {
  try {
    // Extract token from request
    const token = JwtHelper.extractToken(req)

    if (!token) {
      return ResponseHelper.unauthorized(res, "Authentication token required")
    }

    // Verify token
    const decoded = JwtHelper.verifyToken(token)

    // Find user by ID
    const user = await User.findById(decoded.id)

    if (!user) {
      return ResponseHelper.unauthorized(res, "User not found")
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return ResponseHelper.unauthorized(res, "Invalid token")
    }
    if (error.name === "TokenExpiredError") {
      return ResponseHelper.unauthorized(res, "Token expired")
    }
    return ResponseHelper.error(res, "Authentication failed", 500)
  }
}

module.exports = jwtAuth
