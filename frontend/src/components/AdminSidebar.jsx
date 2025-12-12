import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow p-4 flex flex-col gap-4">
      <h2 className="font-bold text-xl mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink 
          to="/admin" 
          className={({ isActive }) => isActive ? "font-bold text-green-600" : "text-gray-700"}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/restaurants" 
          className={({ isActive }) => isActive ? "font-bold text-green-600" : "text-gray-700"}
        >
          Restaurants
        </NavLink>
        <NavLink 
          to="/admin/orders" 
          className={({ isActive }) => isActive ? "font-bold text-green-600" : "text-gray-700"}
        >
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}
