import express from "express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

import { handleErrors } from "./middleware/errors";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use(handleErrors);

export default app;
