import { Request, Response, NextFunction } from "express";

import { countStudentService, deleteStudentAtDatabaseService, editStudentAtDatabaseService, EditStudentData, processStudentDataService, returnFilterValidationsService, saveStudentAtDatabaseService, StudentData } from "../services/studentsServices.js";

export async function getStudentsCountController(req: Request, res: Response, next: NextFunction) {
  const studentFilter = returnFilterValidationsService(req.query);
  try {
    const qtStudents = await countStudentService(studentFilter);
    res.status(200).send({ quantityStudents: qtStudents });
  } catch (e) {
    next(e);
  }
}

export function getStudentsController(req: Request, res: Response) {
  res.status(200).send((req as any).students);
}

export async function addStudentController(req: Request, res: Response, next: NextFunction) {
  const studentData = processStudentDataService(req.body, "newStudent");
  try {
    await saveStudentAtDatabaseService(studentData as StudentData);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

export async function editStudentController(req: Request, res: Response, next: NextFunction) {
  const studentData = processStudentDataService(req.body, "editStudent");
  try {
    await editStudentAtDatabaseService(studentData);
    res.status(200).send(studentData);
  } catch (e) {
    next(e);
  }
}

export async function deleteStudentController(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params?.id);
  try {
    await deleteStudentAtDatabaseService(id);
    res.send("deleted").status(204);
  } catch (e) {
    next(e);
  }
}