import { Request, Response, NextFunction } from "express";

import { findStudentsService, returnFilterValidationsService } from "../services/studentsServices.js";

export async function findStudentsController(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query?.page || 0);
  const studentFilter = returnFilterValidationsService(req.query);

  try {
    const students = await findStudentsService(page, studentFilter);
    (req as any).students = students;
    next();
  } catch (e) {
    next(e)
  }

}