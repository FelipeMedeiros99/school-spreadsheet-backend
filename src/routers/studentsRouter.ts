import { Router } from "express";

import { getStudentsController, getStudentsCountController } from "../controllers/studentsControllers";


const studentsRouter = Router();



studentsRouter.get("/students/count", getStudentsCountController)
studentsRouter.get("/students", getStudentsController)


export default studentsRouter;