import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Summary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/summary")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Summary</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Products" value={data.totalProducts} color="bg-blue-500" />
        <StatCard title="Total Stock" value={data.totalStock} color="bg-green-500" />
        <StatCard title="Orders Today" value={data.ordersToday} color="bg-yellow-500" />
        <StatCard title="Revenue" value={`₹${data.revenue}`} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Out of stock */}
        <InfoCard title="Out of Stock Items">
          {data.outOfStock.length === 0 ? (
            <p>No items are currently out of stock.</p>
          ) : (
            data.outOfStock.map(item => (
              <p key={item._id}>{item.name}</p>
            ))
          )}
        </InfoCard>

        {/* Top selling */}
        <InfoCard title="Top Selling Product">
          <p><strong>Name:</strong> {data.topSelling?.name || "N/A"}</p>
          <p><strong>Category:</strong> {data.topSelling?.category}</p>
          <p><strong>Total Units Sold:</strong> {data.topSelling?.sold}</p>
        </InfoCard>

        {/* Low stock */}
        <InfoCard title="Low Stock Items">
          {data.lowStock.length === 0 ? (
            <p>No low stock items.</p>
          ) : (
            data.lowStock.map(item => (
              <p key={item._id}><strong>{item.name}</strong> – {item.stock} left</p>
            ))
          )}
        </InfoCard>

      </div>
    </div>
  );
}

const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow-md`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    {children}
  </div>
);
