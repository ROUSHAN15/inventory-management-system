import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const order = await Order.create({
      userId: req.user.id,       // ✔ matches DB model
      productId: productId,      // ✔ matches DB model
      quantity,
      total: quantity * product.price,
    });

    // update stock
    product.stock -= quantity;
    await product.save();

    return res.json({ success: true, order });
  } 
  catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("productId", "name price")
      .sort({ createdAt: -1 })
      .lean(); // important so we can modify safely

    const cleanOrders = orders.map((o) => ({
      ...o,
      productName: o.productId?.name || "Unknown Product",
      createdAt: o.createdAt ? o.createdAt : null,
    }));

    res.json({ success: true, orders: cleanOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
