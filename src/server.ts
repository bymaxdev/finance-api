import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/usersRoute";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`Server iniciado em http://localhost:${PORT}`)
);
