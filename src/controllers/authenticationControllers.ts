import { Request, Response } from "express";

export function signInController(req: Request, res: Response){
  res.status(200).send((req as any).token)
}

export function signUpController(req: Request, res: Response){
  res.sendStatus(201)
}