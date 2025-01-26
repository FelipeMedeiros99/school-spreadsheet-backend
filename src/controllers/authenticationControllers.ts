import { Request, Response } from "express";

export function signInController(req: Request, res: Response){
  res.sendStatus(200)
}

export function signUpController(req: Request, res: Response){
  res.sendStatus(201)
}