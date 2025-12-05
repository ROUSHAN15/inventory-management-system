// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const token = localStorage.getItem("pos-token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("User added!");
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "",
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("User deleted");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add User</h2>

          <form className="flex flex-col gap-4" onSubmit={handleAddUser}>
            <input
              name="name"
              placeholder="Name"
              className="border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              className="border p-2 rounded"
              value={formData.address}
              onChange={handleChange}
            />

            <select
              name="role"
              className="border p-2 rounded"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>

            <button className="bg-blue-600 text-white p-2 rounded">
              Add User
            </button>
          </form>
        </div>

        <div className="col-span-2 bg-white p-6 shadow rounded-lg">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.role}</td>
                  <td
                    className="border p-2 text-red-600 cursor-pointer"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;

