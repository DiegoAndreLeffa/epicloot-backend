import express from "express";

import { handleErrors } from "./middleware/errors";

import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use(handleErrors);

export default app;
