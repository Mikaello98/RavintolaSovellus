import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAdmin({ children }) {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in - redirect to login
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (user.user?.role !== 'admin' && user.role !== 'admin') {
    // Logged in but not admin - redirect home
    return <Navigate to='/' replace />;
  }
  return children;
}