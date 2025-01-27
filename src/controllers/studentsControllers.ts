import { Request, Response, NextFunction } from "express";

import { countStudentService, returnFilterValidationsService } from "../services/studentsServices";


export async function getStudentsCountController(req: Request, res: Response, next: NextFunction){
          
    const studentFilter = returnFilterValidationsService(req.query);

    try{
      const qtStudents = await countStudentService(studentFilter);
      res.status(200).send({quantityStudents: qtStudents});
    }catch(e){
      next(e);
    }
}

export function getStudentsController(req: Request, res: Response){
  res.status(201).send((req as any).students)
}

export function addStudentController(req: Request, res: Response){

  res.status(201).send(req.body)
}
