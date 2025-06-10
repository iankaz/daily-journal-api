/**
 * Response Helper Utilities
 * Standardizes API responses across the application
 */
class ResponseHelper {
  /**
   * Send success response
   */
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  }

  /**
   * Send error response
   */
  static error(res, message = "An error occurred", statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
    }

    if (errors) {
      response.errors = errors
    }

    return res.status(statusCode).json(response)
  }

  /**
   * Send validation error response
   */
  static validationError(res, errors) {
    return this.error(res, "Validation failed", 400, errors)
  }

  /**
   * Send not found response
   */
  static notFound(res, message = "Resource not found") {
    return this.error(res, message, 404)
  }

  /**
   * Send unauthorized response
   */
  static unauthorized(res, message = "Authentication required") {
    return this.error(res, message, 401)
  }

  /**
   * Send forbidden response
   */
  static forbidden(res, message = "Access forbidden") {
    return this.error(res, message, 403)
  }
}

module.exports = ResponseHelper
