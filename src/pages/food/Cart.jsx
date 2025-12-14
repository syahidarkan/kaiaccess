import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, AlertCircle, Calendar, Train, MapPin, Armchair, Package, Edit3, Check } from 'lucide-react';
import { useFoodOrderStore } from '../../store/useFoodOrderStore';
import { isAuthenticated } from '../../utils/auth';
import Header from '../../components/layout/Header';

export default function Cart() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('kai_intended_path', '/food/cart');
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    updateCartNotes,
    getCartTotal,
    clearCart,
    deliveryLocation,
    setDeliveryLocation,
    seatNumber,
    setSeatNumber,
    orderDate,
    setOrderDate,
    trainNumber,
    setTrainNumber
  } = useFoodOrderStore();

  const [editingNotes, setEditingNotes] = useState(null);

  const total = getCartTotal();
  const serviceFee = 5000;
  const grandTotal = total + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50/30">
        <Header title="Keranjang Belanja" showBack={true} />

        <div className="flex flex-col items-center justify-center px-6 pt-32">
          <div className="w-40 h-40 bg-gradient-to-br from-kai-grey-100 to-kai-grey-50 rounded-[3rem] flex items-center justify-center mb-8 shadow-lg">
            <ShoppingBag className="w-20 h-20 text-kai-grey-300" />
          </div>
          <h3 className="text-3xl font-black text-kai-grey-900 mb-3">Keranjang Kosong</h3>
          <p className="text-kai-grey-600 text-center mb-10 leading-relaxed max-w-sm">
            Belum ada menu yang ditambahkan.<br/>Yuk pilih menu favoritmu sekarang!
          </p>
          <button
            onClick={() => navigate('/food/menu')}
            className="px-10 py-4 bg-gradient-to-r from-kai-primary to-kai-purple text-white rounded-2xl font-black text-base shadow-premium hover:shadow-glow active:scale-95 transition-all"
          >
            Lihat Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50/30 pb-48">
      <Header
        title="Keranjang Belanja"
        showBack={true}
        rightAction={
          <button
            onClick={() => {
              if (confirm('Hapus semua item dari keranjang?')) {
                clearCart();
              }
            }}
            className="px-4 py-2 bg-error/10 text-error rounded-xl text-sm font-bold hover:bg-error/20 transition-colors"
          >
            Hapus Semua
          </button>
        }
      />

      <div className="px-4 pt-4 space-y-6">
        {/* Pre-Order Section - REDESIGNED */}
        <div className="bg-gradient-to-br from-kai-primary via-kai-primary-light to-kai-purple rounded-3xl p-6 shadow-premium text-white border-2 border-white/20 overflow-hidden relative">
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg">Jadwal Perjalanan</h3>
                <p className="text-xs opacity-90">Kapan Anda akan memesan?</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Tanggal Keberangkatan */}
              <div>
                <label className="text-sm font-black mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal Keberangkatan
                </label>
                <input
                  type="date"
                  value={orderDate ? new Date(orderDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setOrderDate(e.target.value ? new Date(e.target.value).toISOString() : null)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-5 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 focus:border-white/50 outline-none transition-all font-bold"
                />
                <p className="text-xs mt-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  {orderDate
                    ? `✓ Pre-order untuk tanggal ${new Date(orderDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`
                    : '→ Kosongkan untuk pesan instant (saat di kereta)'}
                </p>
              </div>

              {/* Nomor Kereta */}
              {orderDate && (
                <div className="animate-in slide-in-from-top-3 fade-in">
                  <label className="text-sm font-black mb-2 flex items-center gap-2">
                    <Train className="w-4 h-4" />
                    Nomor Kereta
                  </label>
                  <input
                    type="text"
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    placeholder="Contoh: KA 123, Argo Parahyangan"
                    className="w-full px-5 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-4 focus:ring-white/30 focus:border-white/50 outline-none transition-all font-bold"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Location - REDESIGNED */}
        <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-kai-grey-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-kai-primary/10 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-kai-primary" />
            </div>
            <div>
              <h3 className="font-black text-lg text-kai-grey-900">Lokasi Pengantaran</h3>
              <p className="text-xs text-kai-grey-600">Pilih cara terima pesanan</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryLocation('seat')}
                className={`relative p-4 rounded-2xl border-2 font-bold transition-all group ${
                  deliveryLocation === 'seat'
                    ? 'border-kai-primary bg-gradient-to-br from-kai-primary/10 to-kai-purple/5 shadow-kai'
                    : 'border-kai-grey-200 hover:border-kai-grey-300 hover:bg-kai-grey-50'
                }`}
              >
                {deliveryLocation === 'seat' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-kai-primary rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <Armchair className={`w-8 h-8 mb-2 mx-auto ${deliveryLocation === 'seat' ? 'text-kai-primary' : 'text-kai-grey-400'}`} />
                <p className={`text-sm ${deliveryLocation === 'seat' ? 'text-kai-primary' : 'text-kai-grey-700'}`}>
                  Antar ke Kursi
                </p>
              </button>

              <button
                onClick={() => setDeliveryLocation('pickup')}
                className={`relative p-4 rounded-2xl border-2 font-bold transition-all group ${
                  deliveryLocation === 'pickup'
                    ? 'border-kai-primary bg-gradient-to-br from-kai-primary/10 to-kai-purple/5 shadow-kai'
                    : 'border-kai-grey-200 hover:border-kai-grey-300 hover:bg-kai-grey-50'
                }`}
              >
                {deliveryLocation === 'pickup' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-kai-primary rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <Package className={`w-8 h-8 mb-2 mx-auto ${deliveryLocation === 'pickup' ? 'text-kai-primary' : 'text-kai-grey-400'}`} />
                <p className={`text-sm ${deliveryLocation === 'pickup' ? 'text-kai-primary' : 'text-kai-grey-700'}`}>
                  Ambil Sendiri
                </p>
              </button>
            </div>

            {deliveryLocation === 'seat' && (
              <div className="animate-in slide-in-from-top-3 fade-in">
                <label className="block text-sm font-black text-kai-grey-900 mb-2">
                  Nomor Kursi / Gerbong
                </label>
                <input
                  type="text"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="Contoh: A12, Gerbong 2 Kursi 5"
                  className="w-full px-5 py-4 bg-kai-grey-50 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-bold text-kai-grey-900"
                />
              </div>
            )}
          </div>
        </div>

        {/* Cart Items - REDESIGNED */}
        <div className="space-y-4">
          <h3 className="font-black text-xl text-kai-grey-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-kai-primary" />
            Pesanan Anda ({cart.length})
          </h3>

          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-premium transition-all border-2 border-kai-grey-100 hover:border-kai-primary/20"
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg relative">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-black text-kai-grey-900 text-base line-clamp-1 group-hover:text-kai-primary transition-colors">
                        {cartItem.item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(cartItem.id)}
                        className="p-2 text-error hover:bg-error/10 rounded-xl transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm font-bold text-kai-grey-600 mb-3">
                      Rp {cartItem.item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls - REDESIGNED */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 bg-kai-grey-50 rounded-2xl p-1.5 border-2 border-kai-grey-200">
                        <button
                          onClick={() => updateCartQuantity(cartItem.id, cartItem.quantity - 1)}
                          className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-kai-primary font-black hover:bg-kai-primary hover:text-white active:scale-90 transition-all shadow-sm"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-10 text-center font-black text-kai-grey-900 text-lg">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(cartItem.id, cartItem.quantity + 1)}
                          className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-kai-primary font-black hover:bg-kai-primary hover:text-white active:scale-90 transition-all shadow-sm"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-kai-grey-500 uppercase tracking-wide">Subtotal</p>
                        <p className="font-black text-kai-primary text-lg">
                          Rp {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes - REDESIGNED */}
                  {editingNotes === cartItem.id ? (
                    <div className="mt-3 animate-in slide-in-from-top-2 fade-in">
                      <div className="relative">
                        <input
                          type="text"
                          value={cartItem.notes}
                          onChange={(e) => updateCartNotes(cartItem.id, e.target.value)}
                          onBlur={() => setEditingNotes(null)}
                          placeholder="Tulis catatan tambahan..."
                          className="w-full px-4 py-3 text-sm bg-kai-blue-50 border-2 border-kai-primary/30 rounded-xl focus:ring-4 focus:ring-kai-primary/20 outline-none font-medium"
                          autoFocus
                        />
                        <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kai-primary" />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingNotes(cartItem.id)}
                      className="mt-3 text-sm text-kai-primary font-bold hover:underline flex items-center gap-2 group/note"
                    >
                      <Edit3 className="w-4 h-4 group-hover/note:scale-110 transition-transform" />
                      {cartItem.notes ? `Catatan: ${cartItem.notes}` : '+ Tambah Catatan'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary - REDESIGNED */}
        <div className="bg-gradient-to-br from-white to-kai-grey-50 rounded-3xl p-6 shadow-card border-2 border-kai-grey-100">
          <h3 className="font-black text-lg text-kai-grey-900 mb-4 flex items-center gap-2">
            Ringkasan Belanja
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-kai-grey-200">
              <span className="text-kai-grey-600 font-bold">Subtotal ({cart.length} item)</span>
              <span className="font-black text-kai-grey-900 text-lg">Rp {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-kai-grey-200">
              <span className="text-kai-grey-600 font-bold">Biaya Layanan</span>
              <span className="font-black text-kai-grey-900 text-lg">Rp {serviceFee.toLocaleString()}</span>
            </div>
            <div className="pt-2 bg-gradient-to-r from-kai-primary/5 to-kai-purple/5 -mx-6 px-6 py-4 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="font-black text-kai-grey-900 text-lg">Total Pembayaran</span>
                <span className="font-black text-kai-primary text-2xl">Rp {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - REDESIGNED */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-kai-grey-200 p-4 shadow-premium z-[60]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-kai-grey-600 mb-1">Total Pembayaran</p>
              <p className="text-2xl font-black text-kai-primary">Rp {grandTotal.toLocaleString()}</p>
            </div>
            <button
              onClick={() => {
                // Validasi pre-order
                if (orderDate && !trainNumber) {
                  alert('Mohon isi nomor kereta untuk pre-order');
                  return;
                }

                // Validasi seat delivery
                if (deliveryLocation === 'seat' && !seatNumber) {
                  alert('Mohon isi nomor kursi terlebih dahulu');
                  return;
                }

                navigate('/food/checkout');
              }}
              className="px-10 py-4 bg-gradient-to-r from-kai-primary to-kai-purple text-white rounded-2xl font-black text-base shadow-premium hover:shadow-glow active:scale-95 transition-all whitespace-nowrap"
            >
              Lanjut Bayar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
