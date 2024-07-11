import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import cartRoutes from "./routes/cartRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import cors from "cors";
import { handleErrors } from "./middleware/errors";

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewRoutes);
app.use("/api", cartRoutes);
app.use("/api", paymentRoutes);
app.use(handleErrors);

export default app;
