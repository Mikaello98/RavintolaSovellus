import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get('/restaurants');
    setRestaurants(res.data);
  };

  const handleDelete = async (id) => {
    if (!confirm('Poista ravintola?')) return;
    await api.delete(`/restaurants/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Restaurants</h1>
        <Link to='/admin/restaurants/new' className="bg-green-600 text-white px-3 py-1 rounded">New</Link>
      </div>

      <div className="grid gap-3">
        {restaurants.map(r => (
          <div className="p-3 border flex justify-between items-center" key={r._id}>
            <div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-gray-600">{r.description}</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/restaurants/${r._id}/menu`} className="text-blue-600">Menu</Link>
              <Link to={`/admin/restaurants/${r._id}/edit`} className="text-yellow-600">Edit</Link>
              <button onClick={() => handleDelete(r._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}