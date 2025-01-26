import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi";



export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body: userData } = req;
    const { error, value } = schema.validate(userData, {abortEarly: false});

    if(error){
      throw {message: error.message, status: 400}
    }

    next()
  }
}