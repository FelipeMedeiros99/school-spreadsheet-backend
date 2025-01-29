import express, {json} from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routers/index.js";
import errorHandleMiddleware from "./middlewares/errorHandleMiddleware.js";
import { deleteExpiredTokensService } from "./services/authenticationServices.js";
import { corsOptions } from "./config/index.js";
import { optionsRequest } from "./middlewares/authenticationMiddlewares.js";

const app = express();

app.use(cors(corsOptions));
app.use(json());

app.use(optionsRequest)

app.use(router);
app.use(errorHandleMiddleware);

deleteExpiredTokensService()

app.listen(process.env.PORT, ()=>console.log("app running"));
