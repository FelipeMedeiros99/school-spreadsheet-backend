import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import "dotenv/config"

import { saveTokenAtDatabaseRepository, saveUserRepository } from "../repositories/authenticationRepositories.js";
import { encryptPassword, generateTokenService } from "../services/authenticationServices.js";

interface ConfirmPassword {
  confirmPassword?: string
}

type UserDataReceived = Omit<User, "id"> & ConfirmPassword

export async function saveUserDataMiddleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const userData = body as UserDataReceived;

  userData.password = await encryptPassword(userData.password)
  delete userData.confirmPassword;

  try {
    await saveUserRepository({ ...userData, email: userData.email.toLowerCase() })
    next()
  } catch (e) {
    next(e)
  }
}

export async function generateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const userDataDatabase = (req as any).userDataDatabase as User;
  const token = generateTokenService(userDataDatabase);
  (req as any).token = token;

  try {
    await saveTokenAtDatabaseRepository({ token: token, userId: userDataDatabase.id })
    next()
  } catch (e) {
    next(e)
  }
  next()
}


export function optionsRequest(req: Request, res: Response, next: NextFunction){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return 
  }
  
  next();
};
