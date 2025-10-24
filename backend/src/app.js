
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,             
}));

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(process.cwd(), "src/public/images")));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

export default app;
