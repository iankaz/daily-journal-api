const express = require("express")
const router = express.Router()
const JournalController = require("../controllers/journalController")

// GET /api/journals - Get all journals for authenticated user
router.get("/", JournalController.getAllJournals)

// GET /api/journals/:id - Get specific journal
router.get("/:id", JournalController.getJournalById)

// POST /api/journals - Create new journal
router.post("/", JournalController.createJournal)

// PUT /api/journals/:id - Update journal
router.put("/:id", JournalController.updateJournal)

// DELETE /api/journals/:id - Delete journal
router.delete("/:id", JournalController.deleteJournal)

module.exports = router
