import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { useFoodOrderStore } from '../../store/useFoodOrderStore';
import { isAuthenticated } from '../../utils/auth';
import Header from '../../components/layout/Header';

export default function Checkout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('kai_intended_path', '/food/checkout');
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  const {
    cart,
    getCartTotal,
    deliveryLocation,
    seatNumber,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus
  } = useFoodOrderStore();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const total = getCartTotal();
  const serviceFee = 5000;
  const grandTotal = total + serviceFee;

  const paymentMethods = [
    {
      id: 'gopay',
      name: 'GoPay',
      icon: Wallet,
      color: 'text-[#00AA13]',
      bg: 'bg-[#00AA13]/10'
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: Wallet,
      color: 'text-[#4C3494]',
      bg: 'bg-[#4C3494]/10'
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: Wallet,
      color: 'text-[#118EEA]',
      bg: 'bg-[#118EEA]/10'
    },
    {
      id: 'credit_card',
      name: 'Kartu Kredit/Debit',
      icon: CreditCard,
      color: 'text-kai-primary',
      bg: 'bg-kai-blue-50'
    },
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      icon: Building2,
      color: 'text-kai-secondary',
      bg: 'bg-kai-secondary/10'
    },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const order = createOrder(paymentMethod, {
        method: paymentMethod,
        timestamp: new Date().toISOString()
      });

      // Simulate payment confirmation
      setTimeout(() => {
        updatePaymentStatus(order.id, 'paid');
        updateOrderStatus(order.id, 'confirmed', 'Pembayaran berhasil, pesanan sedang diproses');

        // Auto update to preparing after 2 seconds
        setTimeout(() => {
          updateOrderStatus(order.id, 'preparing', 'Pesanan sedang disiapkan oleh dapur');
        }, 2000);

        setIsProcessing(false);
        setShowSuccess(true);

        // Navigate to order tracking after 2 seconds
        setTimeout(() => {
          navigate(`/food/order/${order.id}`);
        }, 2000);
      }, 1500);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-kai-grey-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-kai-grey-900 mb-2">Pembayaran Berhasil!</h2>
          <p className="text-kai-grey-600 mb-6">
            Pesanan kamu sedang diproses.<br/>
            Tunggu sebentar ya!
          </p>
          <div className="animate-pulse">
            <div className="w-8 h-8 border-4 border-kai-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-32">
      <Header title="Pembayaran" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-kai-grey-100">
          <h3 className="font-bold text-kai-grey-900 mb-3">Detail Pesanan</h3>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-kai-grey-600">
                  {item.item.name} x{item.quantity}
                </span>
                <span className="font-bold text-kai-grey-900">
                  Rp {(item.item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-kai-grey-200">
              <span className="text-kai-grey-600">Biaya Layanan</span>
              <span className="font-bold text-kai-grey-900">Rp {serviceFee.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-kai-blue-50 rounded-2xl p-4 border border-kai-blue-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-kai-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-kai-primary mb-1">Lokasi Pengantaran</p>
              <p className="text-sm text-kai-grey-700">
                {deliveryLocation === 'seat' ? `Antar ke Kursi: ${seatNumber}` : 'Ambil Sendiri di Gerbong Restoran'}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-kai-grey-100">
          <h3 className="font-bold text-kai-grey-900 mb-3">Pilih Metode Pembayaran</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-kai-primary bg-kai-blue-50'
                      : 'border-kai-grey-200 hover:border-kai-grey-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-kai-grey-900 text-sm">{method.name}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-kai-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-kai-primary to-kai-primary-light rounded-2xl p-4 shadow-premium">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Pembayaran</p>
              <p className="text-2xl font-bold">Rp {grandTotal.toLocaleString()}</p>
            </div>
            <div className="text-right text-xs opacity-75">
              {cart.length} item
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-kai-grey-200 p-4 pb-safe shadow-premium z-40">
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className="w-full py-4 bg-kai-primary text-white rounded-xl font-bold shadow-kai hover:bg-kai-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Memproses...
            </>
          ) : (
            `Bayar Rp ${grandTotal.toLocaleString()}`
          )}
        </button>
      </div>
    </div>
  );
}
