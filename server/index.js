import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";

// Routes
// import summaryRoute from "./routes/summary.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";
import userRoutes from "./routes/user.js";
import summaryRoute from "./routes/summary.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/summary", summaryRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

// Start server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
