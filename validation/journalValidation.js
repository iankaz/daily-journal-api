const Joi = require("joi")

const journalSchema = Joi.object({
  title: Joi.string().required().min(1).max(100).messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 100 characters",
  }),
  content: Joi.string().required().min(1).messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 1 character long",
  }),
  mood: Joi.string()
    .valid("happy", "sad", "angry", "neutral", "excited", "anxious")
    .required()
    .messages({
      "any.only": "Mood must be one of: happy, sad, angry, neutral, excited, anxious",
    }),
  weather: Joi.string()
    .valid("sunny", "cloudy", "rainy", "snowy", "stormy", "foggy", "windy")
    .required()
    .messages({
      "any.only": "Weather must be one of: sunny, cloudy, rainy, snowy, stormy, foggy, windy",
    }),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  isPrivate: Joi.boolean().default(false),
  location: Joi.string().max(100).allow(""),
  date: Joi.date().default(() => new Date()),
})

const journalUpdateSchema = journalSchema.fork(
  ["title", "content", "mood", "weather", "tags", "isPrivate", "location", "date"],
  (schema) => schema.optional()
)

const validateJournal = (data) => journalSchema.validate(data, { abortEarly: false })
const validateJournalUpdate = (data) => journalUpdateSchema.validate(data, { abortEarly: false })

module.exports = {
  validateJournal,
  validateJournalUpdate,
}
