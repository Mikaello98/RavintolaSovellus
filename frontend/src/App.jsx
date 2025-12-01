import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  )
}