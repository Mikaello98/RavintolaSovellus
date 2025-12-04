import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className='min-h-screen flex'>
      <aside className='w-64 bg-gray-100 p-4'>
        <h2 className='font-bolt mb-4'>Admin</h2>
        <nav className='flex flex-col gap-2'>
          <Link to='/admin'>Dashboard</Link>
          <Link to='/admin/restaurants'>Restaurants</Link>
          <Link to='/admin/orders'>Orders</Link>
        </nav>
      </aside>

      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  );
}