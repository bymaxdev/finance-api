import express from "express";
import { router } from "./routes/route";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const app = express();

const PORT = process.env.PORT || 3000;
app.use("/api", router);
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`Server iniciado em http://localhost:${PORT}`)
);
