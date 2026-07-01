import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/ui/CartDrawer';
import FlyingImage from './components/ui/FlyingImage';
import CheckoutModal from './components/ui/CheckoutModal';
import SearchOverlay from './components/ui/SearchOverlay';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AppContent() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      {/* Global search overlay — opened from the navbar search icon */}
      <SearchOverlay />
      {/* Flying arc animation — rendered above everything */}
      <FlyingImage />
      {/* Cart drawer — passes onCheckout to open the modal */}
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      {/* Checkout modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <main className="flex-1 w-full overflow-x-hidden">
        <ScrollToTop />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/shop/:id"   element={<ProductDetail />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </CartProvider>
    </Router>
  );
}
