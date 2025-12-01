import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import MenuItemCard from '../components/MenuItemCard';

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

   useEffect(() => {
    api.get(`/restaurants/${id}`).then(res => setRestaurant(res.data));
    api.get(`/menu?restaurantId=${id}`).then(res => setMenu(res.data));
  }, [id]);

  if (!restaurant) return <p>Ladataan...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
      <p className="mb-4">{restaurant.description}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {menu.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
