import { useNavigate } from 'react-router-dom';
import {
  Calendar, ArrowRight, MapPin, Clock, Trash2, Ticket,
  Users, Award, PlayCircle, CheckCircle, Info, Sparkles
} from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { formatPrice } from '../utils/dateHelpers';
import { useTranslation } from '../i18n/translations';

export default function MyBooking() {
  const navigate = useNavigate();
  const { bookings, deleteBooking } = useBookingStore();
  const { t } = useTranslation();

  const handleDelete = (bookingId) => {
    if (confirm(t.myBooking.cancelConfirm)) {
      deleteBooking(bookingId);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-kai-grey-50 pb-24">
        {/* Premium Header */}
        <div className="relative bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple text-white px-6 pt-12 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

          <div className="relative max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-warning" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wide">{t.nav.booking}</span>
            </div>
            <h1 className="text-3xl font-bold mb-1.5 font-display">{t.myBooking.title}</h1>
            <p className="text-white/80 text-sm">{t.myBooking.subtitle}</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-8">
          <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-kai-blue-50 to-kai-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Calendar className="w-14 h-14 text-kai-primary" />
            </div>
            <h2 className="text-2xl font-bold text-kai-grey-900 mb-3 font-display">{t.myBooking.noTrips}</h2>
            <p className="text-kai-grey-600 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              {t.myBooking.noTripsDesc}
            </p>

            <button
              onClick={() => navigate('/bali-heritage')}
              className="bg-gradient-to-br from-kai-primary to-kai-purple text-white py-4 px-8 rounded-2xl font-bold flex items-center gap-3 hover:shadow-premium transition-all mx-auto shadow-large active:scale-95 group"
            >
              <Ticket className="w-5 h-5" />
              <span>{t.myBooking.bookBali}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 pt-8 border-t border-kai-grey-100">
              <p className="text-xs text-kai-grey-500 mb-4 font-semibold uppercase tracking-wide">{t.myBooking.orExplore}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/coming-soon')}
                  className="px-6 py-3 bg-kai-grey-50 text-kai-grey-700 rounded-xl text-sm font-bold hover:bg-kai-grey-100 transition-all shadow-soft border border-kai-grey-200"
                >
                  {t.myBooking.trainTicket}
                </button>
                <button
                  onClick={() => navigate('/coming-soon')}
                  className="px-6 py-3 bg-kai-grey-50 text-kai-grey-700 rounded-xl text-sm font-bold hover:bg-kai-grey-100 transition-all shadow-soft border border-kai-grey-200"
                >
                  {t.myBooking.hotel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-24">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple text-white px-6 pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="relative max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-warning" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wide">{t.nav.booking}</span>
              </div>
              <h1 className="text-3xl font-bold mb-1.5 font-display">{t.myBooking.title}</h1>
              <p className="text-white/80 text-sm">{t.myBooking.subtitle}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 shadow-large">
              <p className="text-white font-bold text-2xl text-center leading-none mb-1">{bookings.length}</p>
              <p className="text-white/90 text-xs font-semibold uppercase tracking-wide">{t.myBooking.active}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-8 space-y-5">
        {/* Active Bookings */}
        {bookings.map((booking, idx) => (
          <div key={booking.id} className="bg-white rounded-3xl shadow-premium overflow-hidden border border-kai-grey-100">
            {/* Booking Header */}
            <div className="bg-gradient-to-br from-kai-primary to-kai-purple text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-4 h-4" />
                    <p className="text-xs font-bold uppercase tracking-wider opacity-90">{t.myBooking.bookingId}</p>
                  </div>
                  <p className="text-xl font-bold tracking-wide">{booking.id}</p>
                </div>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="text-white/70 hover:text-white p-2.5 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm active:scale-90"
                  title={t.myBooking.cancel}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-soft">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-bold">{booking.status || t.myBooking.confirmed}</span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-6 space-y-5">
              {/* Route Info */}
              <div className="bg-gradient-to-br from-kai-grey-50 to-white rounded-2xl p-5 border border-kai-grey-100 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-kai-primary/10 to-kai-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <MapPin className="w-6 h-6 text-kai-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-kai-grey-600 mb-1.5 font-semibold uppercase tracking-wide">{t.myBooking.route}</p>
                    <p className="font-bold text-kai-grey-900 text-lg mb-2">Bali Island Heritage Circuit</p>
                    <p className="text-xs text-kai-grey-600">35+ {t.myBooking.checkpoints} • 8 {t.myBooking.hours}</p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-kai-grey-50 rounded-2xl p-4 border border-kai-grey-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-kai-primary" />
                    <p className="text-xs text-kai-grey-600 font-semibold">{t.myBooking.date}</p>
                  </div>
                  <p className="font-bold text-sm text-kai-grey-900">{booking.date}</p>
                </div>
                <div className="bg-kai-grey-50 rounded-2xl p-4 border border-kai-grey-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-kai-primary" />
                    <p className="text-xs text-kai-grey-600 font-semibold">{t.myBooking.time}</p>
                  </div>
                  <p className="font-bold text-sm text-kai-grey-900">{booking.time}</p>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="pt-5 border-t border-kai-grey-100">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-kai-grey-600" />
                  <p className="text-sm font-bold text-kai-grey-900">{t.myBooking.passengerInfo}</p>
                </div>
                <div className="bg-kai-grey-50 rounded-2xl p-4 border border-kai-grey-100">
                  <p className="font-bold text-sm text-kai-grey-900 mb-2">{booking.passenger.name}</p>
                  <p className="text-xs text-kai-grey-600 mb-1">{booking.passenger.email}</p>
                  {booking.passenger.phone && (
                    <p className="text-xs text-kai-grey-600">{booking.passenger.phone}</p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-5 border-t border-kai-grey-100">
                <div>
                  <p className="text-xs text-kai-grey-600 mb-1.5 font-semibold uppercase tracking-wide">{t.myBooking.totalPayment}</p>
                  <p className="text-3xl font-bold text-kai-primary">{formatPrice(booking.price)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-success bg-success/10 px-4 py-2 rounded-xl border border-success/20">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{t.myBooking.paid}</span>
                  </div>
                </div>
              </div>

              {/* Progress (if applicable) */}
              {idx === 0 && (
                <div className="bg-gradient-to-br from-kai-primary/5 to-kai-purple/5 rounded-2xl p-5 border border-kai-primary/20 shadow-soft">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-kai-primary" />
                      <p className="text-sm font-bold text-kai-grey-900">{t.myBooking.progress}</p>
                    </div>
                    <span className="text-sm font-bold text-kai-primary">34%</span>
                  </div>
                  <div className="w-full bg-kai-grey-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-kai-primary to-kai-purple h-2.5 rounded-full transition-all duration-500 shadow-soft" style={{ width: '34%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-kai-grey-600 font-medium">
                    <span>12/35 {t.myBooking.unlocked}</span>
                    <span>•</span>
                    <span>3 {t.myBooking.badges}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate(`/bali-heritage/journey/${booking.id}`)}
                  className="w-full bg-gradient-to-br from-kai-primary to-kai-purple text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-premium transition-all shadow-large active:scale-95 group"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>{idx === 0 ? t.myBooking.continue : t.myBooking.start}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/bali-heritage/profile')}
                  className="w-full bg-kai-grey-50 text-kai-grey-700 py-3 rounded-2xl text-sm font-bold hover:bg-kai-grey-100 transition-all border border-kai-grey-200 flex items-center justify-center gap-2 shadow-soft active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  {t.myBooking.viewAchievements}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Info Card */}
        <div className="bg-gradient-to-br from-kai-blue-50 to-kai-purple/10 rounded-2xl p-5 border border-kai-primary/20 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-kai-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-kai-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-kai-grey-900 mb-2">{t.myBooking.importantInfo}</p>
              <p className="text-xs text-kai-grey-700 leading-relaxed">
                {t.myBooking.infoDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Book New Journey Button */}
        <button
          onClick={() => navigate('/bali-heritage/booking')}
          className="w-full bg-white text-kai-primary py-4 rounded-2xl font-bold border-2 border-kai-primary hover:bg-kai-primary hover:text-white transition-all shadow-card active:scale-95 flex items-center justify-center gap-3 group"
        >
          <Ticket className="w-5 h-5" />
          {t.myBooking.bookNew}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
