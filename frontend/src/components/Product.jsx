import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    supplier: "",
    price: "",
    stock: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("pos-token");
      const res = await axios.get("http://localhost:3000/api/product", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    const token = localStorage.getItem("pos-token");
    const res = await axios.get("http://localhost:3000/api/category", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data.categories || []);
  };

  // FETCH SUPPLIERS
  const fetchSuppliers = async () => {
    const token = localStorage.getItem("pos-token");
    const res = await axios.get("http://localhost:3000/api/supplier", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSuppliers(res.data.suppliers || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  // ADD OR UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("pos-token");

    try {
      let response;

      if (editProduct) {
        // UPDATE
        response = await axios.put(
          `http://localhost:3000/api/product/${editProduct}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ADD NEW
        response = await axios.post(
          "http://localhost:3000/api/product/add",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        alert(editProduct ? "Product updated!" : "Product added!");
        handleCancel();
        fetchProducts();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Operation failed!");
    }
  };

  // OPEN EDIT MODAL
  const handleEdit = (p) => {
    setEditProduct(p._id);
    setFormData({
      name: p.name,
      description: p.description,
      category: p.category,
      supplier: p.supplier,
      price: p.price,
      stock: p.stock,
    });
    setModalOpen(true);
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const token = localStorage.getItem("pos-token");

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/product/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Deleted");
        fetchProducts();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // CANCEL FORM
  const handleCancel = () => {
    setModalOpen(false);
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      supplier: "",
      price: "",
      stock: "",
    });
  };

  // FILTER SEARCH
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditProduct(null);
            setModalOpen(true);
          }}
        >
          Add Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products by name..."
        className="w-full border p-3 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Supplier</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.description}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">{p.supplier}</td>
                <td className="p-3 border">₹{p.price}</td>

                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      p.stock > 10
                        ? "bg-green-500"
                        : p.stock > 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>

                <td className="p-3 border">
                  <div className="flex gap-4">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
            <h2 className="text-xl font-bold">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>

            <button
              className="absolute right-4 top-4 text-xl"
              onClick={handleCancel}
            >
              ✕
            </button>

            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              
              {/* Product Name */}
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Description */}
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Category */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.categoryName}>
                    {c.categoryName}
                  </option>
                ))}
              </select>

              {/* Supplier */}
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Price */}
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Stock */}
              <input
                type="number"
                name="stock"
                min={0}
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editProduct ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;
