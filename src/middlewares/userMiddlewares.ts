import { Request, Response, NextFunction, response } from "express";
import { encryptPassword } from "../services/passwordServices";
import { User } from "@prisma/client";
import { saveUserRepository } from "../repositories/userRepositories";

interface ConfirmPassword {
  confirmPassword?: string
}
type UserDataReceived = Omit<User, "id"> & ConfirmPassword


export async function saveUserDataMiddleware(req: Request, res: Response, next: NextFunction){

  const {body} = req;
  const userData =  body as UserDataReceived;

  userData.password = await encryptPassword(userData.password)
  delete userData.confirmPassword;

  try{
    await saveUserRepository(userData)
    next()

  }catch(e){
    next(e)
  }
  

}