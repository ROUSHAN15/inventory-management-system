import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("pos-token");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // FILTERING
  useEffect(() => {
    let data = products;

    if (selectedCat)
      data = data.filter((item) => item.category === selectedCat);

    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(data);
  }, [selectedCat, search, products]);

  // PLACE ORDER  (FIXED)
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        productId: selectedProduct._id,
        quantity: Number(quantity),
      };

      const res = await axios.post(
        "http://localhost:3000/api/order/place",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Order placed successfully!");
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Order error:", error.response?.data || error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex justify-between mb-4">
        {/* CATEGORY FILTER */}
        <select
          className="border p-2 rounded w-48"
          onChange={(e) => setSelectedCat(e.target.value)}
          value={selectedCat}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p, i) => (
              <tr key={p._id}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">{p.stock}</td>

                <td className="border p-2 text-center">
                  <button
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    onClick={() => {
                      setSelectedProduct(p);
                      setQuantity(1);
                      setShowModal(true);
                    }}
                  >
                    Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 p-4">No products found.</p>
        )}
      </div>

      {/* ORDER MODAL */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Place Order</h2>

            <label className="block mb-2 font-semibold">Quantity</label>
            <input
              type="number"
              min="1"
              max={selectedProduct.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <p className="font-semibold mb-4">
              Total: ₹{quantity * selectedProduct.price}
            </p>

            <div className="flex justify-between">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Place Order
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProducts;
