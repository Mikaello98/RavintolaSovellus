import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const restaurantsData = [
  {
    name: 'Sushimesta',
    description: 'Tuoretta sushia ja aasialaisia herkkuja.',
    imageUrl: 'https://example.com/images/sushimesta.jpg',
  },
  {
    name: 'BurgerBox',
    description: 'Maukkaita hampurilaisia ja ranskalaisia.',
    imageUrl: 'https://example.com/images/burgerbox.jpg',
  },
  {
    name: 'Pizzapiste',
    description: 'Italialaisia pizzoja kiviuunista.',
    imageUrl: 'https://example.com/images/pizzapiste.jpg',
  },
];

const menuData = [
  { restaurantName: 'Sushimesta', name: 'California Roll', description: 'Avokadoa, kurkkua ja majoneesia.', price: 8.5, image: 'https://example.com/images/california_roll.jpg' },
  { restaurantName: 'Sushimesta', name: 'Salmon Nigiri', description: 'Tuoretta lohta riisillä.', price: 3.0, image: 'https://example.com/images/salmon_nigiri.jpg' },

  { restaurantName: 'BurgerBox', name: 'Classic Burger', description: 'Juustolla ja pekonilla.', price: 10.0, image: 'https://example.com/images/classic_burger.jpg' },
  { restaurantName: 'BurgerBox', name: 'Veggie Burger', description: 'Kasvispihvillä ja tuoreilla vihanneksilla.', price: 9.0, image: 'https://example.com/images/veggie_burger.jpg' },

  { restaurantName: 'Pizzapiste', name: 'Margherita', description: 'Tomaattikastiketta, mozzarellaa ja basilikaa.', price: 11.0, image: 'https://example.com/images/margherita.jpg' },
  { restaurantName: 'Pizzapiste', name: 'Pepperoni', description: 'Tomaattikastiketta, mozzarellaa ja pepperonia.', price: 13.0, image: 'https://example.com/images/pepperoni.jpg' },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    const restaurants = await Restaurant.insertMany(restaurantsData);
    console.log('Restaurants added:', restaurants.length);

    const menuItems = menuData.map((item) => {
      const restaurant = restaurants.find((r) => r.name === item.restaurantName);
      return {
        restaurant: restaurant._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
      };
    });

    await MenuItem.insertMany(menuItems);
    console.log('Menu items added:', menuItems.length);

    console.log('Database seeding completed');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();