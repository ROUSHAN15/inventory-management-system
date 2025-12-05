import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getSummary = async (req, res) => {
  try {
    // Total products
    const totalProducts = await Product.countDocuments();

    // Total stock
    const totalStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);

    // Orders today
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    // Revenue (sum of Order.total)
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }   // NOT totalPrice
    ]);

    // Find out-of-stock
    const outOfStock = await Product.find({ stock: 0 });

    // Low stock
    const lowStock = await Product.find({ stock: { $lte: 5, $gt: 0 } });

    // Top selling product
    const topSelling = await Product.findOne().sort({ sold: -1 });

    // Final Response
    res.json({
      totalProducts,
      totalStock: totalStock[0]?.total || 0,
      ordersToday,
      revenue: revenue[0]?.total || 0,
      outOfStock,
      lowStock,
      topSelling,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
