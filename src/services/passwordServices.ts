import bcrypt from "bcrypt";
import "dotenv/config"

export async function encryptPassword(password: string){
  const SALTS = parseInt(process.env.SALTS_ROUNDS as string)
  const encriptedPassword = await bcrypt.hash(password, SALTS)
  
  return encriptedPassword
}


export async function validPasswordIsCorrect(passwordReceived: string, hash: string) {
  const passwordIsCorrect = await bcrypt.compare(passwordReceived, hash)
  
  return passwordIsCorrect
}