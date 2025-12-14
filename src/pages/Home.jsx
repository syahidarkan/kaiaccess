import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Train, Hotel, Package, Plane, Bus, UtensilsCrossed,
  MapPin, ArrowRight, Star, TrendingUp, Gift, Sparkles, Zap
} from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { useTranslation } from '../i18n/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { getUserDisplayName } from '../utils/auth';

export default function Home() {
  const navigate = useNavigate();
  const { bookings } = useBookingStore();
  const { t } = useTranslation();
  const [activePromo, setActivePromo] = useState(0);
  const userName = getUserDisplayName();

  const services = [
    { icon: Train, label: t.home.intercity, route: '/coming-soon', gradient: 'from-orange-500 to-orange-600' },
    { icon: Train, label: t.home.local, route: '/coming-soon', gradient: 'from-blue-600 to-blue-700' },
    { icon: Train, label: t.home.commuter, route: '/coming-soon', gradient: 'from-red-600 to-red-700' },
    { icon: Train, label: 'LRT', route: '/coming-soon', gradient: 'from-purple-600 to-purple-700' },
    { icon: UtensilsCrossed, label: t.home.food, route: '/food/menu', gradient: 'from-kai-secondary to-kai-secondary-dark' },
    { icon: Plane, label: t.home.airport, route: '/coming-soon', gradient: 'from-sky-500 to-sky-600' },
    { icon: Hotel, label: t.home.hotel, route: '/coming-soon', gradient: 'from-indigo-600 to-indigo-700' },
    { icon: Package, label: t.home.logistics, route: '/coming-soon', gradient: 'from-amber-500 to-amber-600' },
  ];

  const promos = [
    {
      title: 'Hotel Discount 50%',
      desc: 'Book hotels across Indonesia with up to 50% discount',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      badge: 'SPECIAL',
      color: 'from-rose-500 to-pink-600'
    },
    {
      title: 'KAI Points Cashback',
      desc: 'Get up to 100,000 KAI Points cashback for round trip tickets',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800',
      badge: 'CASHBACK',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Budget Travel Package',
      desc: 'Complete package: train + hotel + tour guide at special price',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      badge: 'BUNDLE',
      color: 'from-violet-500 to-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-kai-grey-50">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-kai-primary via-kai-primary-dark to-kai-purple overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="relative px-5 pt-12 pb-32">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/id/e/ea/KAI_Access_logo.png?20230712080758"
                alt="KAI"
                className="w-10 h-10"
              />
              <div>
                <p className="text-white/70 text-xs font-medium">{t.home.welcome}</p>
                <h1 className="text-white text-lg font-bold">{userName}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="bg-warning/20 backdrop-blur-sm border border-warning/30 px-3 py-1.5 rounded-full">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span className="text-xs font-bold text-white">Premium</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-xs font-medium">KAIPay</span>
              </div>
              <p className="text-white text-xl font-bold">Rp 1.5M</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-warning to-kai-secondary flex items-center justify-center">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-xs font-medium">{t.home.points}</span>
              </div>
              <p className="text-white text-xl font-bold">2,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-5 -mt-20 relative z-10 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-large">
          <h2 className="text-kai-grey-900 font-bold text-base mb-5">{t.home.services}</h2>
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => navigate(service.route)}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-kai-grey-700 text-center leading-tight line-clamp-2">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions Carousel */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-kai-grey-900 font-bold text-base">{t.home.promos}</h2>
          <button className="text-kai-primary text-sm font-semibold">{t.home.viewAll}</button>
        </div>
        <div className="relative">
          <div className="aspect-[2/1] rounded-2xl overflow-hidden shadow-medium group">
            <div className="relative h-full">
              <img
                src={promos[activePromo].image}
                alt={promos[activePromo].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className={`absolute top-3 left-3 bg-gradient-to-r ${promos[activePromo].color} px-3 py-1 rounded-full`}>
                <span className="text-white text-[10px] font-bold tracking-wide">{promos[activePromo].badge}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-bold mb-1">{promos[activePromo].title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">{promos[activePromo].desc}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {promos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePromo(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activePromo ? 'w-6 bg-kai-primary' : 'w-1.5 bg-kai-grey-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured: Bali Heritage */}
      <div className="px-5 mb-6">
        <div
          onClick={() => navigate('/bali-heritage')}
          className="relative rounded-3xl overflow-hidden shadow-large group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-kai-purple via-kai-primary to-kai-accent-teal" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800')] bg-cover bg-center opacity-20 mix-blend-overlay" />

          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3 border border-white/30">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-white text-[10px] font-bold">NEW</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1.5 leading-tight">
                {t.home.baliHeritage}
              </h3>
              <p className="text-white/80 text-sm mb-4 leading-snug max-w-[200px]">
                {t.home.baliDesc}
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all group-hover:gap-3">
                <span className="text-white text-xs font-bold">{t.home.startAdventure}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured: Food Ordering */}
      <div className="px-5 mb-6">
        <div
          onClick={() => navigate('/food/menu')}
          className="relative rounded-3xl overflow-hidden shadow-large group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-kai-secondary via-kai-secondary-dark to-warning" />

          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3 border border-white/30">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-white text-[10px] font-bold">POPULAR</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1.5 leading-tight">
                {t.home.orderFood}
              </h3>
              <p className="text-white/80 text-sm mb-4 leading-snug max-w-[200px]">
                {t.home.foodDesc}
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all group-hover:gap-3">
                <span className="text-white text-xs font-bold">{t.home.viewMenu}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Trips */}
      {bookings.length > 0 && (
        <div className="px-5 mb-24">
          <h2 className="text-kai-grey-900 font-bold text-base mb-3">{t.home.myTrips}</h2>
          <div className="bg-white rounded-2xl p-4 shadow-card border-l-4 border-kai-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-kai-grey-900 mb-1">Kereta Eksplorasi Bali</p>
                <p className="text-xs text-kai-grey-500">12 Apr 2025 • 08:00 AM</p>
              </div>
              <button
                onClick={() => navigate('/my-booking')}
                className="px-4 py-2 bg-kai-primary/10 text-kai-primary text-xs font-bold rounded-xl hover:bg-kai-primary/20 transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
}
