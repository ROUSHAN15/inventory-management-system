import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },   // <-- ADD THIS
  category: String,
  supplier: String,
  stock: Number,
  price: Number,
  sold: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
