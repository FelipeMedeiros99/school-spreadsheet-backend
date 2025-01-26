import { response } from "express";
import prisma from "../config";

interface UserDataReceived {
  email: string;
  password: string
};

export async function saveUserRepository(userData: UserDataReceived){
  try{  
    await prisma.user.create({
      data: userData
    });
  }catch(e){
    throw {message: "Error saving user.", status: 500}
  }
}