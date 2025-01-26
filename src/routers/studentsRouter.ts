import { Router } from "express";

import { getStudentsController, getStudentsCountController } from "../controllers/studentsControllers";
import { findStudentsController } from "../middlewares/studentsMiddlewares";


const studentsRouter = Router();



studentsRouter.get("/students/count", getStudentsCountController)
studentsRouter.get("/students", findStudentsController, getStudentsController)


export default studentsRouter;