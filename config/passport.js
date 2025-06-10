const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy
const User = require("../models/User")

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id })

        if (!user) {
          user = new User({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
            avatarUrl: profile.photos ? profile.photos[0].value : null,
          })
          await user.save()
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

module.exports = passport
