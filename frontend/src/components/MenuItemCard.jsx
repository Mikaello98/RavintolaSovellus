import { useCartDispatch } from '../context/CartContext';

export default function MenuItemCard({ item }) {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 },
    });
  };
  console.log(item);


  return (
    <div className="border rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
      <div>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-green-700">{item.price.toFixed(2)} €</span>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl text-sm transition"
        >
          Lisää koriin
        </button>
      </div>
    </div>
  );
}
