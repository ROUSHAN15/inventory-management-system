import Product from "../models/Product.js";

// ===============================
// ADD PRODUCT
// ===============================
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, supplier, price, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      supplier,
      price,
      stock,
    });

    await newProduct.save();

    res.json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// ===============================
// GET ALL PRODUCTS
// ===============================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================
export const updateProduct = async (req, res) => {
  try {
    const { name, description, category, supplier, price, stock } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, supplier, price, stock },
      { new: true }
    );

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// ===============================
// DELETE PRODUCT
// ===============================
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
