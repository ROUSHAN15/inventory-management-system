import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth(); // get logged in user
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/user/update-profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      alert("Profile updated successfully!");

      // Update Auth Context + LocalStorage
      login(res.data.user, localStorage.getItem("pos-token"));
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="p-6 max-w-lg bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <label>Password (optional)</label>
      <input
        type="password"
        name="password"
        placeholder="Enter new password"
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <div className="flex gap-3">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Changes
        </button>

        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;
