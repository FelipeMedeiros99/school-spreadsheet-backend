import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import "dotenv/config"

import { saveTokenAtDatabaseRepository, saveUserRepository } from "../repositories/authenticationRepositories";
import { encryptPassword, generateTokenService } from "../services/authenticationServices";

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