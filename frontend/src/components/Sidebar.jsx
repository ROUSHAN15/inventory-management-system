import React from 'react'
import { NavLink } from 'react-router-dom'
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

const Sidebar = () => {

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> ,isParent:true},
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent:false},
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox /> ,isParent:false},
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent:false},
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent:false},
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers /> ,isParent:false },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent:false},
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent:false},
  ]

  return (
    <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed shadow-lg">

      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="hidden md:block text-xl font-bold tracking-wide">
          Inventory MS
        </span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">

          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
              end={item.isParent}
                to={item.path}
                className={({ isActive }) =>
                  (isActive ? "bg-gray-700" : "hover:bg-gray-800") +
                  " flex items-center gap-4 p-2 rounded-md transition-all duration-200"
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="hidden md:block text-sm font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}

        </ul>
      </div>

      {/* Bottom footer */}
      <div className="h-10 text-gray-400 text-xs flex items-center justify-center border-t border-gray-700">
        © 2025 IMS
      </div>
    </div>
  )
}

export default Sidebar
