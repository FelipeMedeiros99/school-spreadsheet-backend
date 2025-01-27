import Joi, { ObjectSchema } from "joi";

export const userSignUpSchema: ObjectSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .min(7)
    .max(200)
    .required()
    .messages({
      "string.email": "O e-mail deve ser válido.",
      "string.min": "O e-mail deve ter pelo menos 7 caracteres.",
      "string.max": "O e-mail pode ter no máximo 200 caracteres.",
      "any.required": "O e-mail é obrigatório."
    }),

  password: Joi
    .string()
    .min(6)
    .required()
    .messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres.",
      "any.required": "A senha é obrigatória."
    }),

  confirmPassword: Joi
    .string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "As senhas precisam coincidir.",
      "any.required": "A confirmação de senha é obrigatória."
    })

})

export const userSignInSchema: ObjectSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .min(7)
    .max(200)
    .required()
    .messages({
      "string.email": "O e-mail deve ser válido.",
      "string.min": "O e-mail deve ter pelo menos 7 caracteres.",
      "string.max": "O e-mail pode ter no máximo 200 caracteres.",
      "any.required": "O e-mail é obrigatório."
    }),

  password: Joi
    .string()
    .min(6)
    .required()
    .messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres.",
      "any.required": "A senha é obrigatória."
    })
})