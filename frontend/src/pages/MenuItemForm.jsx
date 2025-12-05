import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function MenuItemForm() {
  const { id: restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: 0, description: '', image: '' });

  useEffect(() => {
    if (itemId) {
      api.get(`/menu/${itemId}`).then(r => setForm(r.data));
    }
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemId) {
      await api.put(`/menu/${itemId}`, form);
    } else {
      await api.post('/menu', { ...form, restaurant: restaurantId });
    }
    navigate(`/admin/restaurants/${restaurantId}/menu`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <input 
        value={form.name} 
        onChange={e => setForm({ ...form, name: e.target.value})} 
        placeholder='Name' 
        className="border p-2 w-full"
      />
      <input
        type="number"
        value={form.price} 
        onChange={e => setForm({ ...form, price: parseFloat(e.target.value)})} 
        placeholder='Price' 
        className="border p-2 w-full"
      />
      <textarea 
        value={form.description} 
        onChange={e => setForm({ ...form, description: e.target.value})} 
        placeholder='Description' 
        className="border p-2 w-full"
      />
      <input 
        value={form.image} 
        onChange={e => setForm({ ...form, image: e.target.value})} 
        placeholder='Image URL' 
        className="border p-2 w-full"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}