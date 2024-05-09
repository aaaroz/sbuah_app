import express, { type Express } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "@routes/index";
import {
  internalServerError,
  notFound,
  prismaErrorHandler,
  zodErrorHandler,
} from "@/middlewares";

const { PORT } = process.env;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);
app.use(zodErrorHandler);
app.use(prismaErrorHandler);
app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
