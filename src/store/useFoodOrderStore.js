import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFoodOrderStore = create(
  persist(
    (set, get) => ({
      // State
      cart: [], // { id, item, quantity, notes, addedAt }
      orders: [], // History of all orders
      activeOrder: null, // Currently active order being prepared/delivered
      deliveryLocation: 'seat', // 'seat' or 'pickup'
      seatNumber: '',
      orderDate: null, // Tanggal keberangkatan untuk pre-order (ISO string)
      trainNumber: '', // Nomor kereta

      // Actions
      addToCart: (item, quantity = 1, notes = '') => {
        const cart = get().cart;
        const existingItem = cart.find(cartItem =>
          cartItem.item.id === item.id && cartItem.notes === notes
        );

        if (existingItem) {
          set({
            cart: cart.map(cartItem =>
              cartItem.item.id === item.id && cartItem.notes === notes
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          });
        } else {
          set({
            cart: [...cart, {
              id: `cart-${Date.now()}-${Math.random()}`,
              item,
              quantity,
              notes,
              addedAt: new Date().toISOString()
            }]
          });
        }
      },

      removeFromCart: (cartItemId) => {
        set({
          cart: get().cart.filter(item => item.id !== cartItemId)
        });
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }

        set({
          cart: get().cart.map(item =>
            item.id === cartItemId
              ? { ...item, quantity }
              : item
          )
        });
      },

      updateCartNotes: (cartItemId, notes) => {
        set({
          cart: get().cart.map(item =>
            item.id === cartItemId
              ? { ...item, notes }
              : item
          )
        });
      },

      clearCart: () => set({ cart: [] }),

      setDeliveryLocation: (location) => set({ deliveryLocation: location }),

      setSeatNumber: (seatNumber) => set({ seatNumber }),

      setOrderDate: (date) => set({ orderDate: date }),

      setTrainNumber: (trainNumber) => set({ trainNumber }),

      getCartTotal: () => {
        return get().cart.reduce((total, cartItem) => {
          return total + (cartItem.item.price * cartItem.quantity);
        }, 0);
      },

      getCartItemCount: () => {
        return get().cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
      },

      createOrder: (paymentMethod, paymentDetails) => {
        const cart = get().cart;
        const total = get().getCartTotal();
        const deliveryLocation = get().deliveryLocation;
        const seatNumber = get().seatNumber;
        const orderDate = get().orderDate;
        const trainNumber = get().trainNumber;

        const order = {
          id: `ORD${Date.now()}`,
          items: cart,
          total,
          deliveryLocation,
          seatNumber,
          orderDate, // Tanggal keberangkatan
          trainNumber, // Nomor kereta
          orderType: orderDate ? 'pre-order' : 'instant', // pre-order atau instant
          status: 'pending', // pending -> confirmed -> preparing -> ready -> delivered -> completed
          paymentMethod,
          paymentDetails,
          paymentStatus: 'unpaid', // unpaid -> pending -> paid
          createdAt: new Date().toISOString(),
          estimatedTime: Math.max(...cart.map(item => item.item.preparationTime)) + 5, // minutes
          trackingHistory: [
            {
              status: 'pending',
              timestamp: new Date().toISOString(),
              message: orderDate
                ? `Pre-order untuk tanggal ${new Date(orderDate).toLocaleDateString('id-ID')} - Menunggu konfirmasi pembayaran`
                : 'Pesanan dibuat, menunggu konfirmasi pembayaran'
            }
          ]
        };

        set({
          orders: [order, ...get().orders],
          activeOrder: order,
          cart: []
        });

        return order;
      },

      updateOrderStatus: (orderId, newStatus, message) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: newStatus,
                  trackingHistory: [
                    ...order.trackingHistory,
                    {
                      status: newStatus,
                      timestamp: new Date().toISOString(),
                      message: message || `Order status updated to ${newStatus}`
                    }
                  ]
                }
              : order
          )
        });

        // Update activeOrder if it matches
        if (get().activeOrder?.id === orderId) {
          const updatedOrder = get().orders.find(o => o.id === orderId);
          set({ activeOrder: updatedOrder });
        }
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId
              ? { ...order, paymentStatus }
              : order
          )
        });

        // Update activeOrder
        if (get().activeOrder?.id === orderId) {
          const updatedOrder = get().orders.find(o => o.id === orderId);
          set({ activeOrder: updatedOrder });
        }
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      getPendingOrders: () => {
        return get().orders.filter(order =>
          order.status !== 'completed' && order.status !== 'cancelled'
        );
      },

      getCompletedOrders: () => {
        return get().orders.filter(order => order.status === 'completed');
      },

      cancelOrder: (orderId) => {
        get().updateOrderStatus(orderId, 'cancelled', 'Pesanan dibatalkan oleh pengguna');
      },

      // Get stats
      getOrderStats: () => {
        const orders = get().orders;
        return {
          totalOrders: orders.length,
          totalSpent: orders
            .filter(o => o.paymentStatus === 'paid')
            .reduce((sum, o) => sum + o.total, 0),
          pendingOrders: orders.filter(o => o.status === 'pending').length,
          completedOrders: orders.filter(o => o.status === 'completed').length,
        };
      },
    }),
    {
      name: 'food-order-storage',
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        deliveryLocation: state.deliveryLocation,
        seatNumber: state.seatNumber,
        orderDate: state.orderDate,
        trainNumber: state.trainNumber,
      }),
    }
  )
);
