import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAdmin({ children }) {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (user.user?.role !== 'admin' && user.role !== 'admin') {
    return <Navigate to='/' replace />;
  }
  return children;
}