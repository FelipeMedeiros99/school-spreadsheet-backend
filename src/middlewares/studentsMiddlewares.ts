import { Request, Response, NextFunction } from "express";
import { findStudentsService } from "../services/studentsRepository";

export async function findStudentsController(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query?.page || 0);

  try{
    const students = await findStudentsService(page);
    (req as any).students = students;
    next();
  }catch(e){
    next(e)
  }

}