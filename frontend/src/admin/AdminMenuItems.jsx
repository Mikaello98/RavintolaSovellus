import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminMenuItems() {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, [restaurantId]);

  const load = async () => {
    const res = await api.get(`/menu?restaurantId=${restaurantId}`);
    setItems(res.data);
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Poista ruoka?')) return;
    await api.delete(`/menu/${itemId}`);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Menu items</h1>
        <button 
          onClick={() => navigate(`/admin/restaurants/${restaurantId}/menu/new`)} 
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          New Item
        </button>
      </div>

      <div className="grid gap-3">
        {items.map(it => (
          <div key={it._id} className="p-3 border flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-600">{it.description}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>{it.price.toFixed(2)} €</div>
              <Link to={`/admin/restaurants/${restaurantId}/menu/${it._id}/edit`} className="text-yellow-600">Edit</Link>
              <button onClick={() => handleDelete(it._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}