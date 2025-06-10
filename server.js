const express = require("express")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
require("dotenv").config()

// Import configurations
require("./config/passport")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  }),
)

// Passport configuration
app.use(passport.initialize())
app.use(passport.session())

// MongoDB connection
require("./config/database")

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/journals", require("./middleware/auth"), require("./routes/journals"))
app.use("/api/categories", require("./middleware/auth"), require("./routes/categories"))

// Root route
app.get("/", (req, res) => {
  const token = req.query.token;
  res.json({
    message: "Daily Journal API",
    documentation: "/api-docs",
    authentication: "/api/auth/github",
    token: token || null
  });
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`)
})

module.exports = app
