import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi";
import { findUserRepository, validTokenRepository } from "../repositories/authenticationRepositories";
import { validPasswordIsCorrect, validTokenService } from "../services/authenticationServices";

interface UserDataReceived {
  email: string;
  password: string;
  confirmPassword?: string
}

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body: userData } = req;
    const { error, value } = schema.validate(userData, { abortEarly: false });

    if (error) {
      throw { message: error.message, status: 400 }
    }

    next()
  }
}

export async function validIfUserAlredExistsMiddleware(req: Request, res: Response, next: NextFunction) {
  const userData = req.body as UserDataReceived;
  const userIsInDatabase = await findUserRepository(userData.email.toLowerCase())
  if (userIsInDatabase) {
    res.status(409).send("Email já cadastrado");
    return;
  };
  next();
}

export async function validCredentialsMiddleware(req: Request, res: Response, next: NextFunction) {
  const userData = req.body as UserDataReceived;
  const userIsInDatabase = await findUserRepository(userData.email.toLowerCase())
  if (!userIsInDatabase) {
    res.status(404).send("Email não cadastrado");
    return;
  };

  const passwordValidation = await validPasswordIsCorrect(userData.password, userIsInDatabase.password)

  if (!passwordValidation) {
    res.status(401).send("Senha incorreta");
    return;
  }

  (req as any).userDataDatabase = userIsInDatabase

  next();
}


export async function validTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers?.authorization;
  const bearerRegex = /^Bearer\s[a-zA-Z0-9\-_.+~]+$/;

  if (!userToken) {
    res.status(401).send("Token precisa conter cabeçalho com Authorization");
    return;
  }

  const userTokenFormatIsValid = bearerRegex.test(userToken)
  if (!userTokenFormatIsValid) {
    res.status(401).send("Token precisa seguir o formato: Bearer <token>");
    return;
  }

  const tokenExist = await validTokenService(userToken);

  if (!tokenExist) {
    res.status(401).send("Token expirou, faça login novamente!");
    return;
  }

  next()

}