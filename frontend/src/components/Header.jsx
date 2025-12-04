import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, useAuthActions } from '../context/AuthContext';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const user = useAuth();
  const { logout } = useAuthActions();

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        RavintolaSovellus
      </Link>
      <nav className='flex gap-4 items-center'>
        {!user ? (
          <>
            <a href='/login' className='text-green-700'>Kirjaudu</a>
            <a href='/register' className='text-green-700'>Rekisteröinti</a>
          </>
        ) : (
          <>
            <span className='text-gray-700'>Hei, {user.user.name}</span>
            <button
              onClick={logout}
              className='text-red-600 font-medium'
            >
              Kirjaudu ulos
            </button>
          </>
        )}
        <Link to="/">Etusivu</Link>
        <Link to="/cart">Ostoskori ({itemCount})</Link>
      </nav>
    </header>
  );
}