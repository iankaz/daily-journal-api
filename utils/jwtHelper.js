const jwt = require("jsonwebtoken")

/**
 * JWT Helper Utilities
 * Handles JWT token generation and verification
 */
class JwtHelper {
  /**
   * Generate JWT token
   * @param {Object} payload - Data to encode in the token
   * @param {String} expiresIn - Token expiration time (default: '1d')
   * @returns {String} JWT token
   */
  static generateToken(payload, expiresIn = "1d") {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
  }

  /**
   * Verify JWT token
   * @param {String} token - JWT token to verify
   * @returns {Object} Decoded token payload
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }

  /**
   * Extract token from request
   * @param {Object} req - Express request object
   * @returns {String|null} JWT token or null if not found
   */
  static extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      return req.headers.authorization.substring(7)
    }
    return null
  }
}

module.exports = JwtHelper
