import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 mb-2">{restaurant.description}</p>
        <Link
          to={`/restaurant/${restaurant._id}`}
          className="text-green-700 underline font-medium"
        >
          Näytä valikko →
        </Link>
      </div>
    </div>
  );
}