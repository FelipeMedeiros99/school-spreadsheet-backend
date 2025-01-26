import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi";
import { findUser } from "../repositories/userRepositories";
import { promises } from "dns";
import { validPasswordIsCorrect } from "../services/passwordServices";

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

export async function validIfUserAlredExistsMiddleware(req: Request, res: Response, next: NextFunction){
  const userData = req.body as UserDataReceived;
  const userIsInDatabase = await findUser(userData.email)
  if(userIsInDatabase){
    res.status(409).send("Email já cadastrado");
    return;
  };
  next();
}


export async function validCredentialsMiddleware(req: Request, res: Response, next: NextFunction){
  const userData = req.body as UserDataReceived;
  const userIsInDatabase = await findUser(userData.email)
  if(!userIsInDatabase){
    res.status(404).send("Email não cadastrado");
    return;
  };

  const passwordValidation = await validPasswordIsCorrect(userData.password, userIsInDatabase.password)

  if(!passwordValidation){
    res.status(401).send("Senha incorreta");
    return;
  }
  
  next();
}
