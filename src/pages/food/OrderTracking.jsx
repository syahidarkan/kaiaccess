import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, ChefHat, PackageCheck, Truck, Star, ArrowLeft } from 'lucide-react';
import { useFoodOrderStore } from '../../store/useFoodOrderStore';
import Header from '../../components/layout/Header';

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useFoodOrderStore();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = getOrderById(orderId);
    if (!orderData) {
      navigate('/food/orders');
      return;
    }
    setOrder(orderData);

    // Refresh order every 5 seconds for updates
    const interval = setInterval(() => {
      const updated = getOrderById(orderId);
      setOrder(updated);
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-kai-grey-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-kai-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const statusSteps = [
    { key: 'pending', label: 'Menunggu', icon: Clock, color: 'text-warning' },
    { key: 'confirmed', label: 'Dikonfirmasi', icon: CheckCircle, color: 'text-success' },
    { key: 'preparing', label: 'Disiapkan', icon: ChefHat, color: 'text-kai-orange' },
    { key: 'ready', label: 'Siap', icon: PackageCheck, color: 'text-kai-primary' },
    { key: 'delivered', label: 'Diantar', icon: Truck, color: 'text-kai-purple' },
    { key: 'completed', label: 'Selesai', icon: Star, color: 'text-success' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-24">
      <Header title="Lacak Pesanan" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Order ID Card */}
        <div className="bg-gradient-to-r from-kai-primary to-kai-primary-light rounded-2xl p-4 text-white shadow-premium">
          <p className="text-sm opacity-90 mb-1">Order ID</p>
          <p className="text-2xl font-bold mb-3">{order.id}</p>

          {/* Pre-order Info */}
          {order.orderType === 'pre-order' && order.orderDate && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
              <p className="text-xs opacity-90 mb-1">Pre-Order</p>
              <p className="font-bold text-sm">
                {new Date(order.orderDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {order.trainNumber && (
                <p className="text-xs mt-1 opacity-90">Kereta: {order.trainNumber}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              {order.orderType === 'pre-order'
                ? 'Pesanan akan disiapkan pada tanggal keberangkatan'
                : `Estimasi: ${order.estimatedTime} menit`}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-kai-grey-100">
          <h3 className="font-bold text-kai-grey-900 mb-6">Status Pesanan</h3>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-kai-grey-200"></div>
            <div
              className="absolute left-6 top-0 w-0.5 bg-kai-primary transition-all duration-500"
              style={{
                height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`
              }}
            ></div>

            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white transition-all ${
                        isActive
                          ? 'bg-kai-primary shadow-kai'
                          : 'bg-kai-grey-200'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-kai-grey-400'}`} />
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full border-2 border-kai-primary animate-ping"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <p className={`font-bold text-sm mb-1 ${isActive ? 'text-kai-grey-900' : 'text-kai-grey-400'}`}>
                        {step.label}
                      </p>
                      {isActive && order.trackingHistory.find(h => h.status === step.key) && (
                        <p className="text-xs text-kai-grey-600">
                          {new Date(order.trackingHistory.find(h => h.status === step.key).timestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                      {isCurrent && (
                        <div className="mt-2 px-3 py-1 bg-kai-blue-50 rounded-lg inline-block">
                          <p className="text-xs font-bold text-kai-primary">Status Saat Ini</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-kai-grey-100">
          <h3 className="font-bold text-kai-grey-900 mb-3">Detail Pesanan</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.item.image}
                    alt={item.item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-kai-grey-900">{item.item.name}</p>
                  <p className="text-xs text-kai-grey-600">x{item.quantity}</p>
                  {item.notes && (
                    <p className="text-xs text-kai-grey-500 italic mt-1">Note: {item.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-kai-primary">
                    Rp {(item.item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-kai-grey-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-kai-grey-600">Subtotal</span>
              <span className="font-bold">Rp {order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-kai-grey-900">Total</span>
              <span className="font-bold text-kai-primary text-lg">
                Rp {(order.total + 5000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-kai-blue-50 rounded-2xl p-4 border border-kai-blue-100">
          <h3 className="font-bold text-kai-primary text-sm mb-2">Informasi Pengiriman</h3>
          <p className="text-sm text-kai-grey-700">
            {order.deliveryLocation === 'seat'
              ? `Diantar ke Kursi: ${order.seatNumber}`
              : 'Ambil Sendiri di Gerbong Restoran'}
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-kai-grey-100">
          <h3 className="font-bold text-kai-grey-900 text-sm mb-2">Metode Pembayaran</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-kai-grey-700 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              order.paymentStatus === 'paid'
                ? 'bg-success/10 text-success'
                : 'bg-warning/10 text-warning'
            }`}>
              {order.paymentStatus === 'paid' ? 'Lunas' : 'Menunggu'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      {order.status === 'completed' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-kai-grey-200 p-4 pb-safe shadow-premium">
          <button
            onClick={() => navigate('/food/menu')}
            className="w-full py-4 bg-kai-primary text-white rounded-xl font-bold shadow-kai hover:bg-kai-primary-dark active:scale-95 transition-all"
          >
            Pesan Lagi
          </button>
        </div>
      )}
    </div>
  );
}
