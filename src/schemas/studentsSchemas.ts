import Joi from "joi";

export const studentSchema = Joi.object({
  age: Joi
    .number()
    .min(3)
    .max(80)
    .required()
    .messages({
      "number.base": "A idade precisa ser um número válido.",
      "number.min": "O aluno deve ter no mínimo, 3 anos.",
      "number.max": "A idade máxima permitida é 80 anos.",
      "any.required": "Informar a idade é obrigatório."
    }),

  name: Joi
    .string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Insira um nome válido.",
      "string.min": "O nome precisa conter, pelo menos, 3 caracteres.",
      "string.max": "O nome deve conter, no máximo, 200 caracteres.",
      "any.required": "Informar o nome é obrigatório."
    }),

  class: Joi
    .string()
    .max(10)
    .min(1)
    .required()
    .messages({
      "string.base": "A turma deve ser uma string.",
      "string.max": "A turma deve possuir no máximo, 10 caracteres.",
      "string.empty": "A classe não posse ser vazia",
      "any.required": "Informar a turma é obrigatorio."
    }),

  userId: Joi
    .number()
    .required()
    .messages({
      "number.base": "O id do usuário deve ser um número válido.",
      "any.required": "Id do usuário é obrigatório."
    })
})

export const updateStudentSchema = Joi.object({
  age: Joi
    .number()
    .min(3)
    .max(80)
    .required()
    .messages({
      "number.base": "A idade precisa ser um número válido.",
      "number.min": "O aluno deve ter no mínimo, 3 anos.",
      "number.max": "A idade máxima permitida é 80 anos.",
      "any.required": "Informar a idade é obrigatório."
    }),

  name: Joi
    .string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Insira um nome válido.",
      "string.min": "O nome precisa conter, pelo menos, 3 caracteres.",
      "string.max": "O nome deve conter, no máximo, 200 caracteres.",
      "any.required": "Informar o nome é obrigatório."
    }),

  class: Joi
    .string()
    .max(10)
    .min(1)
    .required()
    .messages({
      "string.base": "A turma deve ser uma string.",
      "string.max": "A turma deve possuir no máximo, 10 caracteres.",
      "string.empty": "A classe não posse ser vazia",
      "any.required": "Informar a turma é obrigatorio."
    }),

  studentId: Joi
    .number()
    .required()
    .messages({
      "number.base": "O id do estudante deve ser um número válido.",
      "any.required": "O id do estudante é obrigatório."
    })
})