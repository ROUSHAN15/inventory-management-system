import Category from "../models/categoryModel.js";

// ----------------------------------------------------
// ADD CATEGORY
// ----------------------------------------------------
const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    const newCategory = new Category({
      categoryName,
      categoryDescription,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Add Category Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------------------------------
// GET ALL CATEGORIES
// ----------------------------------------------------
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Get Categories Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------------------------------
// UPDATE CATEGORY
// ----------------------------------------------------
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, categoryDescription } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, categoryDescription },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------------------------------
// DELETE CATEGORY
// ----------------------------------------------------
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addCategory, getCategories, updateCategory, deleteCategory };
