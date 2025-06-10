/**
 * Global Error Handler Middleware
 * Centralized error handling for the application
 */
const ResponseHelper = require("../utils/responseHelper")

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }))
    return ResponseHelper.validationError(res, errors)
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return ResponseHelper.error(res, "Invalid ID format", 400)
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return ResponseHelper.error(res, `${field} already exists`, 400)
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return ResponseHelper.unauthorized(res, "Invalid token")
  }

  if (err.name === "TokenExpiredError") {
    return ResponseHelper.unauthorized(res, "Token expired")
  }

  // Default server error
  return ResponseHelper.error(res, "Internal server error", 500)
}

module.exports = errorHandler
