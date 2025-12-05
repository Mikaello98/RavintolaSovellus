import { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o._id} className="p-3 border">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Order {o._id}</div>
                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{o.total.toFixed(2)} €</div>
                <div className="text-sm">{o.customerName || '—'}</div>
              </div>
            </div>

            <div className="mt-2">
              <ul className="list-disc pl-5">
                {o.items.map(it => (
                < li key={it._id}>{it.name} x {it.quantity} — {(it.price * it.quantity).toFixed(2)} €</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}