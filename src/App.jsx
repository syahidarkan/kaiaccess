import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';

// Auth & Main pages
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));

// Main App pages
const Home = lazy(() => import('./pages/Home'));
const MyBooking = lazy(() => import('./pages/MyBooking'));
const ProfilePlaceholder = lazy(() => import('./pages/ProfilePlaceholder'));

// Bali Heritage feature pages
const BaliHeritageLanding = lazy(() => import('./pages/bali-heritage/Landing'));
const BaliHeritageBooking = lazy(() => import('./pages/bali-heritage/Booking'));
const BaliHeritageJourney = lazy(() => import('./pages/bali-heritage/Journey'));
const BaliHeritageCheckpoint = lazy(() => import('./pages/bali-heritage/CheckpointDetail'));
const BaliHeritageAR = lazy(() => import('./pages/bali-heritage/ARMode'));
const BaliHeritageProfile = lazy(() => import('./pages/bali-heritage/Profile'));

// Food Order feature pages
const FoodMenu = lazy(() => import('./pages/food/FoodMenu'));
const FoodCart = lazy(() => import('./pages/food/Cart'));
const FoodCheckout = lazy(() => import('./pages/food/Checkout'));
const OrderTracking = lazy(() => import('./pages/food/OrderTracking'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-kai-primary"></div>
      <p className="mt-4 text-kai-grey">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth Routes (No Layout) */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App (With Layout) */}
          <Route path="/" element={<Layout />}>
            {/* Main tabs */}
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="my-booking" element={<MyBooking />} />
            <Route path="profile" element={<ProfilePlaceholder />} />

            {/* Coming Soon for placeholder features */}
            <Route path="coming-soon" element={<ComingSoon />} />

            {/* Bali Heritage Feature */}
            <Route path="bali-heritage">
              <Route index element={<BaliHeritageLanding />} />
              <Route path="booking" element={<BaliHeritageBooking />} />
              <Route path="journey/:bookingId" element={<BaliHeritageJourney />} />
              <Route path="checkpoint/:checkpointId" element={<BaliHeritageCheckpoint />} />
              <Route path="ar" element={<BaliHeritageAR />} />
              <Route path="profile" element={<BaliHeritageProfile />} />
            </Route>

            {/* Food Order Feature */}
            <Route path="food">
              <Route index element={<Navigate to="/food/menu" replace />} />
              <Route path="menu" element={<FoodMenu />} />
              <Route path="cart" element={<FoodCart />} />
              <Route path="checkout" element={<FoodCheckout />} />
              <Route path="order/:orderId" element={<OrderTracking />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
