import express from "express";
import userRoutes from "./routes";
import { handleErrors } from "./middleware/errors";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use(handleErrors);

export default app;
