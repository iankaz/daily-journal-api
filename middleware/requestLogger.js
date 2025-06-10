/**
 * Request Logger Middleware
 * Logs incoming requests for debugging and monitoring
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString()
  const method = req.method
  const url = req.originalUrl
  const userAgent = req.get("User-Agent") || "Unknown"
  const ip = req.ip || req.connection.remoteAddress

  console.log(`[${timestamp}] ${method} ${url} - ${ip} - ${userAgent}`)

  // Log request body for POST/PUT requests (excluding sensitive data)
  if ((method === "POST" || method === "PUT") && req.body) {
    const sanitizedBody = { ...req.body }
    // Remove sensitive fields from logs
    delete sanitizedBody.password
    delete sanitizedBody.token
    console.log("Request Body:", JSON.stringify(sanitizedBody, null, 2))
  }

  next()
}

module.exports = requestLogger
