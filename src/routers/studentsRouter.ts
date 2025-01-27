import { Router } from "express";

import { addStudentController, getStudentsController, getStudentsCountController } from "../controllers/studentsControllers";
import { findStudentsController } from "../middlewares/studentsMiddlewares";
import { validateSchema, validTokenMiddleware } from "../middlewares/validationsMiddlewares";
import { studentSchema } from "../schemas/studentsSchemas";


const studentsRouter = Router();

studentsRouter.get("/students/count", validTokenMiddleware, getStudentsCountController)
studentsRouter.get("/students", validTokenMiddleware, findStudentsController, getStudentsController)

studentsRouter.post("/student", validTokenMiddleware, validateSchema(studentSchema), addStudentController)

export default studentsRouter;