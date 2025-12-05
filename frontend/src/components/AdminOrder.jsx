import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error loading orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, i) => (
            <tr key={o._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{o.productId?.name}</td>
              <td className="border p-2">{o.quantity}</td>
              <td className="border p-2">${o.total}</td>
              <td className="border p-2">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
