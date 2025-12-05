import React, { useEffect, useState } from "react";
import axios from "axios";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null); // STORES ID

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  // INPUT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SEARCH SUPPLIER
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = suppliers.filter((s) =>
      s.name.toLowerCase().includes(value) ||
      s.email.toLowerCase().includes(value) ||
      s.number.toLowerCase().includes(value) ||
      s.address.toLowerCase().includes(value)
    );

    setFilteredSuppliers(filtered);
  };

  // FETCH SUPPLIERS
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("pos-token");

      const response = await axios.get("http://localhost:3000/api/supplier", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuppliers(response.data.suppliers || []);
      setFilteredSuppliers(response.data.suppliers || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // ADD OR UPDATE SUPPLIER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const token = localStorage.getItem("pos-token");

      if (editSupplier) {
        response = await axios.put(
          `http://localhost:3000/api/supplier/${editSupplier}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/supplier/add",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        alert(editSupplier ? "Supplier updated!" : "Supplier added!");
        handleCancel();
        fetchSuppliers();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Operation failed!");
    }
  };

  // OPEN EDIT MODAL
  const handleEdit = (s) => {
    setEditSupplier(s._id);
    setFormData({
      name: s.name,
      email: s.email,
      number: s.number,
      address: s.address,
    });
    setModalOpen(true);
  };

  // DELETE SUPPLIER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/supplier/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("pos-token")}` },
        }
      );

      if (response.data.success) {
        alert("Supplier deleted!");
        fetchSuppliers();
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  // CANCEL BUTTON
  const handleCancel = () => {
    setModalOpen(false);
    setEditSupplier(null);
    setFormData({
      name: "",
      email: "",
      number: "",
      address: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Supplier..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded w-1/3"
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            setEditSupplier(null);
            setModalOpen(true);
          }}
        >
          Add Supplier
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">S No.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Number</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredSuppliers.map((s, i) => (
            <tr key={s._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.number}</td>
              <td className="border p-2">{s.address}</td>

              <td className="border p-2 space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3 shadow relative">

            <h2 className="text-xl font-bold">
              {editSupplier ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <button
              className="absolute right-4 top-4 text-xl"
              onClick={handleCancel}
            >
              ×
            </button>

            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" placeholder="Name" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
              <input type="number" name="number" value={formData.number} onChange={handleChange} className="border p-2 rounded" placeholder="Phone" />
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" placeholder="Address" />

              <div className="flex gap-3">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  {editSupplier ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleCancel}
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

export default Suppliers;
