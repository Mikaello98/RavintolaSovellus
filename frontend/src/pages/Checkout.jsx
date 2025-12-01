import { useCart, useCartDispatch } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    customerAddress: '',
    customerPhone: '',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    e.preventDefault();
      const orderData = { 
        items,
        restaurantId: items[0]?.restaurantId,
        total,
        ...form,
       };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json

      if (data.success) {
        dispatch({ type: 'CLEAR_CART' });
        navigate(`/checkout/success/${data.orderId}`);
      }
    };

  return (
    <div className="max-w-1g mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Kassalle</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border p-2"
          placeholder="Nimesi"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
        />
        <input
          className="border p-2"
          placeholder="Osoitteesi"
          value={form.customerAddress}
          onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
          required
        />
        <input
          className="border p-2"
          placeholder="Puhelinnumerosi"
          value={form.customerPhone}
          onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
          required
        />

        <Button className='bg-blue-600 text-white p-2 rounded'>
          Vahvista tilaus (${total.toFixed(2)})
        </Button>
      </form>
    </div>
  );
}