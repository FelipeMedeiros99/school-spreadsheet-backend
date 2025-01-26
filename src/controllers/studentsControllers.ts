import { Request, Response, NextFunction } from "express";

import { countStudentService } from "../services/studentsRepository";

export async function getStudentsCountController(req: Request, res: Response, next: NextFunction){
    try{
      const qtStudents = await countStudentService()
      res.status(200).send({quantityStudents: qtStudents})
    }catch(e){
      next(e)
    }

}

export function getStudentsController(req: Request, res: Response){
  console.log(req.query)
  res.sendStatus(201)
}