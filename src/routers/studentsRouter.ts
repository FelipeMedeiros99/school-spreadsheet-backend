import { Router } from "express";

import { addStudentController, deleteStudentController, editStudentController, getStudentsController, getStudentsCountController } from "../controllers/studentsControllers.js";
import { findStudentsController } from "../middlewares/studentsMiddlewares.js";
import { validateSchema, validIfStudentExistsMiddleware, validTokenMiddleware } from "../middlewares/validationsMiddlewares.js";
import { studentSchema, updateStudentSchema } from "../schemas/studentsSchemas.js";


const studentsRouter = Router();

studentsRouter.get("/students/count", 
  validTokenMiddleware, 
  getStudentsCountController
)

  studentsRouter.get("/students", 
  validTokenMiddleware, 
  findStudentsController, 
  getStudentsController
)

studentsRouter.post("/students", 
  validTokenMiddleware, 
  validateSchema(studentSchema), 
  addStudentController
)

studentsRouter.put("/students", 
  validTokenMiddleware, 
  validateSchema(updateStudentSchema), 
  editStudentController
)

studentsRouter.delete("/students/:id", 
  validTokenMiddleware, 
  validIfStudentExistsMiddleware, 
  deleteStudentController)

export default studentsRouter;