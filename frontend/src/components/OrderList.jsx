import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("pos-token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
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
              <td className="border p-2">{o.productName}</td>
              <td className="border p-2">{o.quantity}</td>
              <td className="border p-2">₹{o.total}</td>
              <td className="border p-2">
                {o.createdAt
                  ? new Date(o.createdAt).toLocaleDateString()
                  : "--"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
