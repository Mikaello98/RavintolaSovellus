import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Header from './components/Header'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAdmin from './components/RequireAdmin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminRestaurants from './admin/AdminRestaurants';
import AdminRestaurantForm from './admin/AdminRestaurantForm';
import AdminMenuItems from './admin/AdminMenuItems';
import AdminOrders from './admin/AdminOrders';

export default function App() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success/:orderId" element={<CheckoutSuccess />} />

          {/* ADMIN */}
          <Route path="/admin" element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="restaurants/new" element={<AdminRestaurantForm />} />
            <Route path="restaurants/:id/edit" element={<AdminRestaurantForm />} />
            <Route path="restaurants/:id/menu" element={<AdminMenuItems />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}