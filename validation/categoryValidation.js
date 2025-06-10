const Joi = require("joi")

const categorySchema = Joi.object({
  name: Joi.string().trim().max(50).required(),
  description: Joi.string().max(200).allow(""),
  color: Joi.string()
    .pattern(/^#[0-9A-F]{6}$/i)
    .default("#3B82F6"),
  isDefault: Joi.boolean().default(false),
})

const categoryUpdateSchema = Joi.object({
  name: Joi.string().trim().max(50),
  description: Joi.string().max(200).allow(""),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  isDefault: Joi.boolean(),
}).min(1)

const validateCategory = (data) => {
  return categorySchema.validate(data)
}

const validateCategoryUpdate = (data) => {
  return categoryUpdateSchema.validate(data)
}

module.exports = {
  validateCategory,
  validateCategoryUpdate,
}
