import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi";
import { findUser } from "../repositories/userRepositories";

interface UserDataReceived {
  email: string;
  password: string;
  confirmPassword?: string
}

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

export async function validIfUserAlredExists(req: Request, res: Response, next: NextFunction){
  const userData = req.body as UserDataReceived;
  try{
    const userIsInDatabase = await findUser(userData.email)
    if(!!userIsInDatabase){
      throw {message: "Email já cadastrado", status: 409}
    }
    next()
    
  }catch(e){
    next(e)
  }

}