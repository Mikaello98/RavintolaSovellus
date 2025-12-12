import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function AdminRestaurantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', imageUrl: '' });

  useEffect(() => {
    if (id) {
      api.get(`/restaurants/${id}`).then(res => setForm(res.data));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/restaurants/${id}`, form);
    } else {
      await api.post('/restaurants', form);
    }
    navigate('/admin/restaurants');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{id ? 'Edit' : 'New'} Restaurant</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          placeholder="Name" 
          className="border p-2 w-full" 
        />
        <input 
          value={form.imageUrl} 
          onChange={e => setForm({...form, imageUrl: e.target.value})} 
          placeholder="Image URL" 
          className="border p-2 w-full" 
        />
        <textarea 
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
          placeholder="Description" 
          className="border p-2 w-full"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}