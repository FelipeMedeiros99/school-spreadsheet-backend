import { Router } from "express";

import { addStudentController, editStudentController, getStudentsController, getStudentsCountController } from "../controllers/studentsControllers";
import { findStudentsController } from "../middlewares/studentsMiddlewares";
import { validateSchema, validTokenMiddleware } from "../middlewares/validationsMiddlewares";
import { studentSchema, updateStudentSchema } from "../schemas/studentsSchemas";


const studentsRouter = Router();

studentsRouter.get("/students/count", validTokenMiddleware, getStudentsCountController)
studentsRouter.get("/students", validTokenMiddleware, findStudentsController, getStudentsController)

studentsRouter.post("/students", validTokenMiddleware, validateSchema(studentSchema), addStudentController)
studentsRouter.put("/students", validTokenMiddleware, validateSchema(updateStudentSchema), editStudentController)

export default studentsRouter;