import { Request, Response, NextFunction } from "express"
import { Schema } from "joi";


export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body: userData } = req;
    const { error, value } = schema.validate(userData);

    if(error){
      throw {message: error.message, status: 400}
    }

    next()
  }
}