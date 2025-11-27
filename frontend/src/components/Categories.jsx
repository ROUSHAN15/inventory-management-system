import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  // ---------------------------------------------------
  // FETCH CATEGORIES
  // ---------------------------------------------------
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("pos-token");

      const response = await axios.get(
        "http://localhost:3000/api/category/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------------------------------------------
  // ADD / UPDATE CATEGORY
  // ---------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("pos-token");

    try {
      if (editCategory) {
        // UPDATE CATEGORY
        const response = await axios.put(
          `http://localhost:3000/api/category/${editCategory}`,
          { categoryName, categoryDescription },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) alert("Category updated!");
      } else {
        // ADD CATEGORY
        const response = await axios.post(
          "http://localhost:3000/api/category/add",
          { categoryName, categoryDescription },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) alert("Category added!");
      }

      // RESET FORM
      setCategoryName("");
      setCategoryDescription("");
      setEditCategory(null);

      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error occurred!");
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // EDIT CATEGORY
  // ---------------------------------------------------
  const handleEdit = (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  // ---------------------------------------------------
  // CANCEL EDIT
  // ---------------------------------------------------
  const handleCancel = () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };

  // ---------------------------------------------------
  // DELETE CATEGORY
  // ---------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const token = localStorage.getItem("pos-token");

      const response = await axios.delete(
        `http://localhost:3000/api/category/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Deleted successfully!");
        fetchCategories();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <div className="p-4 text-xl">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Category Management</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* FORM */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl text-center font-bold mb-4">
              {editCategory ? "Edit Category" : "Add Category"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border p-2 w-full rounded-md"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="border p-2 w-full rounded-md"
                required
              />

              <button className="w-full bg-green-600 text-white p-3 rounded-md">
                {editCategory ? "Save Changes" : "Add Category"}
              </button>

              {editCategory && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-red-500 text-white p-3 rounded-md"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md p-4 rounded-md">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cat.categoryName}</td>
                    <td className="border p-2">{cat.categoryDescription}</td>
                    <td className="border p-2 flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleEdit(cat)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleDelete(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
