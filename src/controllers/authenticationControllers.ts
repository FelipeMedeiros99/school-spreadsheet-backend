import { Request, Response } from "express";

export function signInController(req: Request, res: Response) {
  const responseData = {
    token: (req as any).token,
    userId: (req as any).userDataDatabase.id
  }
  res.status(200).send(responseData)
}

export function signUpController(req: Request, res: Response) {
  res.sendStatus(201)
}