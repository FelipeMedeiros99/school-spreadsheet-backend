import express, {json} from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routers/index.js";
import errorHandleMiddleware from "./middlewares/errorHandleMiddleware.js";
import { deleteExpiredTokensService } from "./services/authenticationServices.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandleMiddleware);

deleteExpiredTokensService()

app.listen(process.env.PORT, ()=>console.log("app running"));