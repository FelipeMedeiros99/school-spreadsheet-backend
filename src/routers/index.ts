import { Router } from "express";

import autenticatioinRouter from "./autenticationRouters";
import studentsRouter from "./studentsRouter";

const router = Router();
router.use(autenticatioinRouter);
router.use(studentsRouter)

export default router;