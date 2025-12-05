import Supplier from "../models/Supplier.js";

// ================================
// ADD SUPPLIER
// ================================
const addSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    const existingSupplier = await Supplier.findOne({ number });
    if (existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier already exists" });
    }

    const newSupplier = new Supplier({
      name,
      email,
      number,
      address,
    });

    await newSupplier.save();

    return res
      .status(201)
      .json({ success: true, message: "Supplier added successfully" });
  } catch (error) {
    console.error("Error adding supplier:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding supplier" });
  }
};

// ================================
// GET ALL SUPPLIERS
// ================================
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting suppliers" });
  }
};

// ================================
// UPDATE SUPPLIER
// ================================
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, address } = req.body;

    await Supplier.findByIdAndUpdate(id, { name, email, number, address });

    return res
      .status(200)
      .json({ success: true, message: "Supplier updated successfully" });
  } catch (error) {
    console.error("Error updating supplier:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating supplier" });
  }
};

// ================================
// DELETE SUPPLIER
// ================================
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await Supplier.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while deleting supplier" });
  }
};

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };
