import { useCart, useCartDispatch } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Checkout() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const orderData = { items, totalPrice };
      await api.post("/orders", orderData);
      dispatch({ type: "CLEAR_CART" });
      alert("Tilaus onnistui!");
      navigate("/");
    }

    catch (error) {
      console.error("Tilaus epäonnistui:", error);
      alert("Tilaus epäonnistui. Yritä uudelleen.");
    }

  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tilaus</h1>
      <p>Yhteensä: {totalPrice.toFixed(2)} €</p>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Lähetä tilaus
      </button>
    </div>
  );
}
