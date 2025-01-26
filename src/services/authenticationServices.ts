import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { deleteExpiredTokensRepository } from "../repositories/authenticationRepositories";

interface UserData{
  id: number;
  email: string;
  password?: string
}

export async function encryptPassword(password: string){
  const SALTS = parseInt(process.env.SALTS_ROUNDS as string)
  const encriptedPassword = await bcrypt.hash(password, SALTS)
  
  return encriptedPassword
}


export async function validPasswordIsCorrect(passwordReceived: string, hash: string) {
  const passwordIsCorrect = await bcrypt.compare(passwordReceived, hash)
  
  return passwordIsCorrect
}


export function generateTokenService(userDataDatabase: UserData){
  delete userDataDatabase.password;
  const JWT_KEY = process.env.JWT_KEY as string
  const token = jwt.sign(userDataDatabase, JWT_KEY)
  return token

}

export function deleteExpiredTokensService(){
  const oneMinute = 60*1000
  setInterval(async()=> await deleteExpiredTokensRepository(), oneMinute)

}