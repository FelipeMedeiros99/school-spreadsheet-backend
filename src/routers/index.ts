import { Router } from "express";
import autenticatioinRouter from "./autenticationRouters";


const router = Router();
router.use(autenticatioinRouter);

export default router;