import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        RavintolaSovellus
      </Link>
      <nav className='flex gap-4 items-center'>
        <Link to="/">Etusivu</Link>
        <Link to="/cart">Ostoskori ({itemCount})</Link>
      </nav>
    </header>
  );
}