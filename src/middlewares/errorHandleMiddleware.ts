import { Request, Response, NextFunction } from "express";

interface Error {
  message: string;
  status: number
}

export default function errorHandleMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  try {
    res.status(err?.status || 500).send(err.message || "internal server error")
  } catch (e) {
    console.log(e)
    res.send("Internal server error").status(500)
  }
}