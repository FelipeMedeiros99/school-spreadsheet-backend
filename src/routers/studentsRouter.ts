import { Router } from "express";

import { getStudentsController, getStudentsCountController } from "../controllers/studentsControllers";
import { findStudentsController } from "../middlewares/studentsMiddlewares";
import { validTokenMiddleware } from "../middlewares/validationsMiddlewares";


const studentsRouter = Router();

studentsRouter.get("/students/count", validTokenMiddleware, getStudentsCountController)
studentsRouter.get("/students", validTokenMiddleware, findStudentsController, getStudentsController)


export default studentsRouter;