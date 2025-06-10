/**
 * Authentication middleware
 * Ensures user is authenticated before accessing protected routes
 */
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ error: "Authentication required" })
}

module.exports = requireAuth
