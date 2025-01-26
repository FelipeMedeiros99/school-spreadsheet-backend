import { response } from "express";
import prisma from "../config";

interface UserDataReceived {
  email: string;
  password: string;
};

interface UserDataToken{
  token: string;
  userId: number
}

export async function saveUserRepository(userData: UserDataReceived) {
  try {
    await prisma.user.create({
      data: userData
    });
  } catch (e) {
    throw { message: "Error saving user.", status: 500 }
  }
}

export async function findUserRepository(userEmail: string) {
  const userInDatabase = await prisma.user.findFirst({
    where: {
      email: userEmail
    }
  })

  return userInDatabase
}

export async function saveTokenAtDatabaseRepository(userToken: UserDataToken) {
  await prisma.tokens.create({
    data: userToken
  })
}

