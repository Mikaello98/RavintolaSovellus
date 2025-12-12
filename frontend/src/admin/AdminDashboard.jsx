import { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/restaurants').then(r => r.data.length),
      api.get('/menu').then(r => r.data.length),
      api.get('/orders').then(r => r.data.length),
    ]).then(([rCount, mCount, oCount]) => setStats({ rCount, mCount, oCount }))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border">Restaurants: {stats.rCount}</div>
        <div className="p-4 border">Menu items: {stats.mCount}</div>
        <div className="p-4 border">Orders: {stats.oCount}</div>
      </div>
    </div>
  );
}