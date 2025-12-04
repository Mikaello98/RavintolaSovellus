import { useEffect, useState } from 'react';
import api from '../utils/api';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get('/restaurants').then(res => setRestaurants(res.data));
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Ravintolat</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}