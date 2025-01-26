import express, {json} from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routers";
import errorHandleMiddleware from "./middlewares/errorHandleMiddleware";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandleMiddleware);

app.listen(process.env.PORT, ()=>console.log("app running"));