import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, LayoutGrid, User } from 'lucide-react';
import { useTranslation } from '../../i18n/translations';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home, path: '/home' },
    { id: 'trip', label: t.nav.booking, icon: Calendar, path: '/my-booking' },
    { id: 'services', label: t.nav.services, icon: LayoutGrid, path: '/coming-soon' },
    { id: 'profile', label: t.nav.profile, icon: User, path: '/profile' },
  ];

  const isActive = (path) => {
    if (path === '/my-booking') {
      return location.pathname.startsWith('/my-booking') || location.pathname.startsWith('/bali-heritage');
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-kai-grey-200/50 safe-area-bottom z-50 shadow-2xl">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-all duration-300 active:scale-90 ${
                active ? 'text-kai-primary' : 'text-kai-grey-500'
              }`}
            >
              {/* Active indicator pill */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-kai-primary to-kai-purple rounded-full" />
              )}

              {/* Icon with modern styling */}
              <div className={`relative ${active ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
                <Icon
                  className="w-6 h-6"
                  strokeWidth={active ? 2.5 : 2}
                />
                {active && (
                  <div className="absolute inset-0 bg-kai-primary/10 rounded-full blur-xl" />
                )}
              </div>

              {/* Label */}
              <span className={`text-xs ${active ? 'font-bold' : 'font-medium'} transition-all duration-300`}>
                {item.label}
              </span>

              {/* Bottom glow effect for active */}
              {active && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-kai-primary/5 to-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
