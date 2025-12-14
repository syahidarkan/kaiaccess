import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import KayChat from '../kay/KayChat';
import KayFab from '../kay/KayFab';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-16 relative">
      <main className="pb-safe-area-bottom">
        <Outlet />
      </main>

      {/* KAY AI Chat - accessible everywhere */}
      <KayChat />

      {/* KAY FAB - ALWAYS visible (disabled when journey not started) */}
      <KayFab />

      <BottomNav />
    </div>
  );
}
