import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Train, Users,
  CreditCard, Check, MapPin, Armchair, ChevronLeft, Lock
} from 'lucide-react';
import { useBookingStore } from '../../store/useBookingStore';
import { formatPrice, generateBookingCode } from '../../utils/dateHelpers';
import { calculatePrice, getPriceLabel, getAllPrices } from '../../utils/pricingLogic';
import { isAuthenticated } from '../../utils/auth';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../../components/layout/Header';

export default function Booking() {
  const navigate = useNavigate();
  const { createBooking } = useBookingStore();
  const [step, setStep] = useState(1);

  // Auth guard - block guest users
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('kai_intended_path', '/bali-heritage/booking');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const [bookingData, setBookingData] = useState({
    date: '',
    time: '07:00',
    seat: null,
    passenger: { name: '', idNumber: '', phone: '', email: '' },
  });
  const [bookingResult, setBookingResult] = useState(null);

  // Single ticket type with dynamic pricing
  const getTicketPrice = () => {
    if (!bookingData.date) return 500000;
    const prices = getAllPrices(bookingData.date);
    return prices.Eksekutif; // Use Eksekutif pricing as the single price
  };

  const ticketPrice = getTicketPrice();

  // Generate seats layout (single class, 50 seats)
  const generateSeats = () => {
    const rows = 13;
    const seatsPerRow = 4;
    const seats = [];
    const occupiedSeats = [3, 7, 12, 15, 21, 28, 35, 42];

    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = row * seatsPerRow + col + 1;
        const isOccupied = occupiedSeats.includes(seatNumber);
        const isAisle = col === 1;

        rowSeats.push({
          number: seatNumber,
          row: row + 1,
          position: col < 2 ? 'A' + (col + 1) : 'B' + (col - 1),
          occupied: isOccupied,
          forward: row % 2 === 0,
        });

        if (isAisle && col === 1) {
          rowSeats.push({ isAisle: true });
        }
      }
      seats.push(rowSeats);
    }

    return seats;
  };

  const handleSubmit = () => {
    const booking = createBooking({
      ...bookingData,
      price: ticketPrice,
      carriage: 'Kereta Eksplorasi Bali',
    });
    setBookingResult(booking);
    setStep(5);
  };

  // Confirmation Screen
  if (step === 5 && bookingResult) {
    return (
      <div className="min-h-screen bg-kai-grey-50">
        <Header title="Booking Confirmed" showBack={false} />

        <div className="max-w-lg mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-card p-8 text-center border border-kai-grey-100">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-kai-grey-900 mb-2">Booking Berhasil!</h1>
            <p className="text-kai-grey-600 mb-6">Perjalanan Anda telah berhasil dipesan</p>

            <div className="bg-kai-grey-50 rounded-xl p-6 mb-6 border border-kai-grey-200">
              <p className="text-sm text-kai-grey-600 mb-2">Kode Booking</p>
              <p className="text-2xl font-bold text-kai-primary mb-4">{bookingResult.id}</p>
              <QRCodeSVG value={bookingResult.id} size={200} className="mx-auto mb-4" />
              <div className="text-sm text-left space-y-3 mt-4 pt-4 border-t border-kai-grey-200">
                <div className="flex justify-between">
                  <span className="text-kai-grey-600">Tanggal:</span>
                  <span className="font-bold text-kai-grey-900">{bookingResult.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kai-grey-600">Waktu:</span>
                  <span className="font-bold text-kai-grey-900">{bookingResult.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kai-grey-600">Gerbong:</span>
                  <span className="font-bold text-kai-grey-900">{bookingResult.carriage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kai-grey-600">Kursi:</span>
                  <span className="font-bold text-kai-grey-900">{bookingResult.seat}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-kai-grey-200">
                  <span className="text-kai-grey-700 font-semibold">Total:</span>
                  <span className="font-bold text-kai-primary text-lg">{formatPrice(bookingResult.price)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate(`/bali-heritage/journey/${bookingResult.id}`)}
                className="w-full bg-kai-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-kai-primary-dark transition-all shadow-kai"
              >
                Mulai Perjalanan Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/bali-heritage')}
                className="w-full bg-kai-grey-100 text-kai-grey-700 py-3 rounded-xl font-semibold hover:bg-kai-grey-200 transition-colors"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking Steps
  const steps = [
    { number: 1, title: 'Tanggal', icon: Calendar },
    { number: 2, title: 'Kursi', icon: Armchair },
    { number: 3, title: 'Penumpang', icon: Users },
    { number: 4, title: 'Pembayaran', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-24">
      <Header title="Booking Tiket" />

      {/* Progress Stepper */}
      <div className="bg-white border-b border-kai-grey-200 px-6 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isCompleted = step > s.number;

              return (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-kai-primary text-white shadow-kai'
                        : isCompleted
                        ? 'bg-success text-white'
                        : 'bg-kai-grey-200 text-kai-grey-500'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs mt-1.5 font-semibold ${
                      isActive ? 'text-kai-primary' : isCompleted ? 'text-success' : 'text-kai-grey-500'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 mb-6 ${
                      isCompleted ? 'bg-success' : 'bg-kai-grey-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Step 1: Select Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-kai-grey-900 mb-2">Pilih Tanggal & Waktu</h2>
              <p className="text-kai-grey-600 text-sm">Tentukan jadwal perjalanan heritage Anda</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Tanggal Keberangkatan
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Waktu Keberangkatan
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                >
                  <option value="07:00">07:00 - Pagi (07:00-13:00 WITA)</option>
                  <option value="12:00">12:00 - Sore (12:00-18:30 WITA)</option>
                </select>
              </div>
            </div>

            {/* Dynamic Price Info */}
            {bookingData.date && (
              <div className={`rounded-xl p-4 border ${
                getPriceLabel(bookingData.date).color === 'error'
                  ? 'bg-error/10 border-error/20'
                  : getPriceLabel(bookingData.date).color === 'warning'
                  ? 'bg-warning/10 border-warning/20'
                  : 'bg-success/10 border-success/20'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-kai-grey-900">
                    {getPriceLabel(bookingData.date).label}
                  </p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    getPriceLabel(bookingData.date).color === 'error'
                      ? 'bg-error text-white'
                      : getPriceLabel(bookingData.date).color === 'warning'
                      ? 'bg-warning text-white'
                      : 'bg-success text-white'
                  }`}>
                    {getPriceLabel(bookingData.date).multiplier}
                  </span>
                </div>
                <p className="text-xs text-kai-grey-700">
                  <strong>Eksekutif:</strong> {formatPrice(getAllPrices(bookingData.date).Eksekutif)} •{' '}
                  <strong>Bisnis:</strong> {formatPrice(getAllPrices(bookingData.date).Bisnis)} •{' '}
                  <strong>Ekonomi:</strong> {formatPrice(getAllPrices(bookingData.date).Ekonomi)}
                </p>
              </div>
            )}

            <div className="bg-kai-blue/10 rounded-xl p-4 border border-kai-blue/20">
              <p className="text-sm text-kai-grey-700">
                <strong className="text-kai-primary">Info:</strong> Perjalanan heritage berlangsung selama 8 jam dengan 35+ checkpoint budaya di seluruh Bali.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-kai-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-kai-grey-700">Harga Tiket</span>
                <span className="text-2xl font-bold text-kai-primary">{formatPrice(ticketPrice)}</span>
              </div>
              <p className="text-xs text-kai-grey-500">1 penumpang • Kereta Eksplorasi Bali</p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!bookingData.date}
              className="w-full bg-kai-primary text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-kai-primary-dark transition-all shadow-kai flex items-center justify-center gap-2"
            >
              Lanjutkan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Select Seat */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-kai-grey-900 mb-2">Pilih Kursi</h2>
              <p className="text-kai-grey-600 text-sm">
                Kereta Eksplorasi Bali • 50 kursi tersedia
              </p>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl p-4 border border-kai-grey-200">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kai-grey-100 rounded border border-kai-grey-300" />
                  <span className="text-kai-grey-700">Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kai-primary text-white rounded flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-kai-grey-700">Dipilih</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kai-grey-300 rounded border border-kai-grey-400" />
                  <span className="text-kai-grey-700">Terisi</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-kai-grey-200 flex items-center justify-center gap-4 text-xs text-kai-grey-600">
                <div className="flex items-center gap-1">
                  <span className="text-lg">⬆️</span>
                  <span>Menghadap depan</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">⬇️</span>
                  <span>Menghadap belakang</span>
                </div>
              </div>
            </div>

            {/* Seat Map */}
            <div className="bg-white rounded-xl p-6 border border-kai-grey-200 overflow-x-auto">
              <div className="min-w-[280px]">
                {/* Train Front Indicator */}
                <div className="flex items-center justify-center mb-4 pb-4 border-b-2 border-dashed border-kai-grey-300">
                  <div className="bg-kai-primary/10 px-4 py-2 rounded-lg">
                    <p className="text-xs font-bold text-kai-primary flex items-center gap-2">
                      <Train className="w-4 h-4" />
                      DEPAN KERETA
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {generateSeats().map((row, rowIdx) => (
                    <div key={rowIdx} className="flex items-center justify-center gap-2">
                      <span className="text-xs text-kai-grey-500 w-6">{rowIdx + 1}</span>
                      {row.map((seat, seatIdx) => {
                        if (seat.isAisle) {
                          return <div key={`aisle-${seatIdx}`} className="w-6" />;
                        }

                        const isSelected = bookingData.seat === seat.number;

                        return (
                          <button
                            key={seat.number}
                            onClick={() => !seat.occupied && setBookingData({ ...bookingData, seat: seat.number })}
                            disabled={seat.occupied}
                            className={`w-12 h-12 rounded-lg border-2 font-bold text-xs transition-all flex items-center justify-center ${
                              seat.occupied
                                ? 'bg-kai-grey-300 border-kai-grey-400 text-kai-grey-600 cursor-not-allowed'
                                : isSelected
                                ? 'bg-kai-primary border-kai-primary text-white shadow-kai scale-105'
                                : 'bg-kai-grey-50 border-kai-grey-300 text-kai-grey-700 hover:border-kai-primary hover:bg-kai-primary/5'
                            }`}
                            title={`Kursi ${seat.number} - ${seat.forward ? 'Menghadap depan' : 'Menghadap belakang'}`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-xs">{seat.forward ? '⬆️' : '⬇️'}</span>
                              <span>{seat.number}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Train Back Indicator */}
                <div className="flex items-center justify-center mt-4 pt-4 border-t-2 border-dashed border-kai-grey-300">
                  <div className="bg-kai-grey-100 px-4 py-2 rounded-lg">
                    <p className="text-xs font-bold text-kai-grey-600">BELAKANG KERETA</p>
                  </div>
                </div>
              </div>
            </div>

            {bookingData.seat && (
              <div className="bg-kai-primary/5 rounded-xl p-4 border border-kai-primary/20">
                <p className="text-sm text-kai-grey-700">
                  <strong className="text-kai-primary">Kursi dipilih:</strong> Nomor {bookingData.seat}
                  {generateSeats().flat().find(s => s.number === bookingData.seat)?.forward ? ' (Menghadap depan)' : ' (Menghadap belakang)'}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-kai-grey-100 text-kai-grey-700 py-4 rounded-xl font-bold hover:bg-kai-grey-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!bookingData.seat}
                className="flex-1 bg-kai-primary text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-kai-primary-dark transition-all shadow-kai flex items-center justify-center gap-2"
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Passenger Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-kai-grey-900 mb-2">Data Penumpang</h2>
              <p className="text-kai-grey-600 text-sm">Lengkapi data diri untuk pemesanan</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama sesuai KTP"
                  value={bookingData.passenger.name}
                  onChange={(e) => setBookingData({ ...bookingData, passenger: { ...bookingData.passenger, name: e.target.value } })}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  Nomor KTP/Identitas
                </label>
                <input
                  type="text"
                  placeholder="16 digit nomor KTP"
                  value={bookingData.passenger.idNumber}
                  onChange={(e) => setBookingData({ ...bookingData, passenger: { ...bookingData.passenger, idNumber: e.target.value } })}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  value={bookingData.passenger.phone}
                  onChange={(e) => setBookingData({ ...bookingData, passenger: { ...bookingData.passenger, phone: e.target.value } })}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-kai-grey-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={bookingData.passenger.email}
                  onChange={(e) => setBookingData({ ...bookingData, passenger: { ...bookingData.passenger, email: e.target.value } })}
                  className="w-full border border-kai-grey-300 rounded-xl p-4 focus:ring-2 focus:ring-kai-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-kai-grey-100 text-kai-grey-700 py-4 rounded-xl font-bold hover:bg-kai-grey-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!bookingData.passenger.name || !bookingData.passenger.email}
                className="flex-1 bg-kai-primary text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-kai-primary-dark transition-all shadow-kai flex items-center justify-center gap-2"
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Summary */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-kai-grey-900 mb-2">Ringkasan Pembayaran</h2>
              <p className="text-kai-grey-600 text-sm">Periksa kembali detail pemesanan Anda</p>
            </div>

            <div className="bg-white rounded-xl border border-kai-grey-200 overflow-hidden">
              {/* Journey Details */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-kai-grey-600 mb-1">Rute Perjalanan</p>
                  <p className="font-bold text-kai-grey-900">Kereta Eksplorasi Bali</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-kai-grey-600 mb-1">Tanggal</p>
                    <p className="font-bold text-kai-grey-900">{bookingData.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kai-grey-600 mb-1">Waktu</p>
                    <p className="font-bold text-kai-grey-900">{bookingData.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-kai-grey-600 mb-1">Kursi</p>
                  <p className="font-bold text-kai-grey-900">Nomor {bookingData.seat}</p>
                </div>

                <div className="pt-4 border-t border-kai-grey-200">
                  <p className="text-xs text-kai-grey-600 mb-1">Penumpang</p>
                  <p className="font-bold text-kai-grey-900">{bookingData.passenger.name}</p>
                  <p className="text-sm text-kai-grey-600">{bookingData.passenger.email}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-kai-grey-50 p-5 border-t border-kai-grey-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-kai-grey-700">Harga Tiket</span>
                    <span className="font-semibold text-kai-grey-900">
                      {formatPrice(ticketPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-kai-grey-700">Biaya Admin</span>
                    <span className="font-semibold text-kai-grey-900">{formatPrice(5000)}</span>
                  </div>
                  <div className="pt-3 border-t border-kai-grey-300 flex justify-between">
                    <span className="font-bold text-kai-grey-900">Total Pembayaran</span>
                    <span className="font-bold text-kai-primary text-xl">
                      {formatPrice(ticketPrice + 5000)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm font-bold text-kai-grey-700 mb-3">Metode Pembayaran</p>
              <div className="space-y-2">
                <button className="w-full border-2 border-kai-primary bg-kai-primary/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-kai-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-kai-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-kai-grey-900 text-sm">KAI Pay</p>
                      <p className="text-xs text-kai-grey-600">Saldo: Rp 2.500.000</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-kai-primary bg-kai-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-kai-grey-100 text-kai-grey-700 py-4 rounded-xl font-bold hover:bg-kai-grey-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-kai-primary text-white py-4 rounded-xl font-bold hover:bg-kai-primary-dark transition-all shadow-kai flex items-center justify-center gap-2"
              >
                Bayar Sekarang
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
