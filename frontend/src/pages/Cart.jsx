import React from 'react';
import { useCart, useCartDispatch } from '../context/cartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ostoskori</h1>
      {items.length === 0 ? (
        <p>Ostoskori on tyhjä. <Link to="/" className="text-green-700 underline">Selaa ravintoloita</Link></p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item._id} className="border-b py-4 flex justify-between items-center">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })}
                className="text-red-600 underline"
              >
                Poista
              </button>
            </div>
          ))}
          <div className="text-right font-bold mt-4">
            Kokonaishinta: {totalPrice.toFixed(2)} €
          </div>
          <Link to="/checkout" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded">
            Siirry kassalle
          </Link>
        </div>
      )}
    </div>
  );
}