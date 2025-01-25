import express, {json} from "express";
import cors from "cors";
import "dotenv/config";
import autenticatioinRouter from "./routers/autenticationRouters";

const app = express()
app.use(cors())
app.use(json())
app.use(autenticatioinRouter)

app.listen(process.env.PORT, ()=>console.log("app running"))