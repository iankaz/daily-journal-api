const Joi = require("joi")

const journalSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  content: Joi.string().max(5000).required(),
  date: Joi.date().default(Date.now),
  mood: Joi.string()
    .valid("very-happy", "happy", "neutral", "sad", "very-sad", "anxious", "excited", "grateful")
    .required(),
  weather: Joi.string().valid("sunny", "cloudy", "rainy", "snowy", "stormy", "foggy", "windy").default("sunny"),
  tags: Joi.array().items(Joi.string().trim().max(50)).default([]),
  isPrivate: Joi.boolean().default(true),
  category: Joi.string().hex().length(24).required(),
  location: Joi.string().max(100).allow(""),
})

const journalUpdateSchema = Joi.object({
  title: Joi.string().trim().max(200),
  content: Joi.string().max(5000),
  date: Joi.date(),
  mood: Joi.string().valid("very-happy", "happy", "neutral", "sad", "very-sad", "anxious", "excited", "grateful"),
  weather: Joi.string().valid("sunny", "cloudy", "rainy", "snowy", "stormy", "foggy", "windy"),
  tags: Joi.array().items(Joi.string().trim().max(50)),
  isPrivate: Joi.boolean(),
  category: Joi.string().hex().length(24),
  location: Joi.string().max(100).allow(""),
}).min(1)

const validateJournal = (data) => {
  return journalSchema.validate(data)
}

const validateJournalUpdate = (data) => {
  return journalUpdateSchema.validate(data)
}

module.exports = {
  validateJournal,
  validateJournalUpdate,
}
