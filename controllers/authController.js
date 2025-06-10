const passport = require("passport")
const JwtHelper = require("../utils/jwtHelper")
const ResponseHelper = require("../utils/responseHelper")

/**
 * Auth Controller
 * Handles authentication-related operations
 */
class AuthController {
  /**
   * Initiate GitHub OAuth
   */
  static githubAuth = passport.authenticate("github", { scope: ["user:email"] })

  /**
   * Handle GitHub OAuth callback
   */
  static githubCallback = (req, res, next) => {
    passport.authenticate("github", { failureRedirect: "/login" }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect("/login")
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }

        // Generate JWT token
        const token = JwtHelper.generateToken({ id: user._id })

        // Redirect with token (in production, use a more secure method)
        return res.redirect(`${process.env.CLIENT_URL || "/dashboard"}?token=${token}`)
      })
    })(req, res, next)
  }

  /**
   * Logout user
   */
  static logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return ResponseHelper.error(res, "Logout failed", 500)
      }
      ResponseHelper.success(res, null, "Logged out successfully")
    })
  }

  /**
   * Get current user information
   */
  static getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
      ResponseHelper.success(res, {
        id: req.user._id,
        username: req.user.username,
        displayName: req.user.displayName,
        email: req.user.email,
        avatarUrl: req.user.avatarUrl,
      })
    } else {
      ResponseHelper.unauthorized(res)
    }
  }

  /**
   * Get JWT token for authenticated user
   */
  static getToken = (req, res) => {
    if (req.isAuthenticated()) {
      const token = JwtHelper.generateToken({ id: req.user._id })
      ResponseHelper.success(res, { token })
    } else {
      ResponseHelper.unauthorized(res)
    }
  }
}

module.exports = AuthController
