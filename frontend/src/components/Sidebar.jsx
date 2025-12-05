import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  FaBox,
  FaCog,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
// console.log("Sidebar user:", user);

  const { user } = useAuth();

  // Admin menu
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true },
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false },
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false },
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false },
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent: false },
    
  ];

  // Customer menu
  const customerItems = [
    { name: "Products", path: "/customer-dashboard", icon: <FaBox />, isParent: false },
    { name: "Orders", path: "/customer-dashboard/my-orders", icon: <FaShoppingCart />, isParent: false },
    { name: "Profile", path: "/customer-dashboard/profile", icon: <FaCog />, isParent: false },
    { name: "Logout", path: "/customer-dashboard/logout", icon: <FaSignOutAlt />, isParent: false },
  ];

  // Which menu to display
  const [menuLinks, setMenuLinks] = useState(customerItems);

useEffect(() => {
  console.log("Sidebar user:", user);

  if (user && user.role === "admin") {
    setMenuLinks(menuItems);
  }
   else {
    setMenuLinks(customerItems);
  }
}, [user]);


  return (
    <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed">

      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      {/* MENU LIST */}
      <div className="space-y-2 p-2">
        <ul>
          {menuLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                end={item.isParent}
                to={item.path}
                className={({ isActive }) =>
                  (isActive ? "bg-gray-700" : "") +
                  " flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4 hidden md:block">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="h-10 text-gray-400 text-xs flex items-center justify-center border-t border-gray-700 mt-auto">
        © 2025 IMS
      </div>

    </div>
  );
  // console.log("Sidebar user:", user);

};

export default Sidebar;
