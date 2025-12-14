import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Filter, Clock, Star, Leaf, ChefHat, Flame, Award } from 'lucide-react';
import { foodMenu, foodCategories, getFoodByCategory, searchFood, getHalalFood } from '../../data/foodMenu';
import { useFoodOrderStore } from '../../store/useFoodOrderStore';
import Header from '../../components/layout/Header';

export default function FoodMenu() {
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useFoodOrderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showHalalOnly, setShowHalalOnly] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(null);

  const cartCount = getCartItemCount();

  // Filter logic
  const getFilteredFood = () => {
    let filtered = foodMenu;

    if (searchQuery) {
      filtered = searchFood(searchQuery);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (showHalalOnly) {
      filtered = filtered.filter(item => item.isHalal);
    }

    return filtered;
  };

  const filteredFood = getFilteredFood();

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setShowAddedPopup(item);
    setTimeout(() => setShowAddedPopup(null), 2000);
  };

  const categoryLabels = {
    all: 'Semua',
    [foodCategories.BALI_SPECIAL]: 'Spesial Bali',
    [foodCategories.MAIN_COURSE]: 'Utama',
    [foodCategories.APPETIZER]: 'Pembuka',
    [foodCategories.SNACK]: 'Cemilan',
    [foodCategories.DESSERT]: 'Penutup',
    [foodCategories.BEVERAGE]: 'Minuman'
  };

  const categoryIcons = {
    all: Filter,
    [foodCategories.BALI_SPECIAL]: Award,
    [foodCategories.MAIN_COURSE]: ChefHat,
    [foodCategories.APPETIZER]: Flame,
    [foodCategories.SNACK]: Star,
    [foodCategories.DESSERT]: Star,
    [foodCategories.BEVERAGE]: Star
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50/30 pb-32">
      {/* Premium Header with Gradient */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-kai-grey-200/50 shadow-sm">
        <Header
          title="Menu Makanan & Minuman"
          showBack={true}
          rightAction={
            <button
              onClick={() => navigate('/food/cart')}
              className="relative p-2.5 bg-gradient-to-br from-kai-primary/10 to-kai-purple/10 rounded-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-kai-primary" />
              {cartCount > 0 && (
                <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-gradient-to-r from-kai-orange to-kai-orange-dark rounded-full text-white text-xs font-bold flex items-center justify-center px-1.5 shadow-lg animate-pulse">
                  {cartCount}
                </div>
              )}
            </button>
          }
        />

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400 group-focus-within:text-kai-primary transition-colors" />
            <input
              type="text"
              placeholder="Cari menu favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-kai-grey-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-kai-primary/30 focus:ring-4 focus:ring-kai-primary/10 outline-none transition-all text-kai-grey-900 placeholder-kai-grey-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Added to cart popup */}
      {showAddedPopup && (
        <div className="fixed top-24 left-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in">
          <div className="bg-gradient-to-r from-success to-success/90 text-white p-4 rounded-2xl shadow-premium flex items-center gap-4 backdrop-blur-xl border border-white/20">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
              <img src={showAddedPopup.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base">Ditambahkan! ✓</p>
              <p className="text-sm opacity-90 truncate">{showAddedPopup.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills - Horizontal Scroll */}
      <div className="sticky top-[120px] z-40 bg-gradient-to-b from-white via-white to-transparent pb-4 pt-2">
        <div className="px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            {['all', ...Object.values(foodCategories)].map((category) => {
              const Icon = categoryIcons[category] || Star;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-kai-primary to-kai-purple text-white shadow-kai scale-105'
                      : 'bg-white text-kai-grey-700 hover:bg-kai-grey-50 border-2 border-kai-grey-200 hover:border-kai-grey-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[category]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Halal Filter & Count */}
        <div className="px-4 pt-3 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showHalalOnly}
                onChange={(e) => setShowHalalOnly(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-kai-grey-300 text-success focus:ring-4 focus:ring-success/20 cursor-pointer"
              />
            </div>
            <span className="text-sm font-bold text-kai-grey-700 flex items-center gap-2 group-hover:text-success transition-colors">
              <Leaf className="w-5 h-5 text-success" />
              Halal Saja
            </span>
          </label>
          <div className="px-4 py-2 bg-kai-blue-50 rounded-full">
            <span className="text-sm font-bold text-kai-primary">{filteredFood.length} menu</span>
          </div>
        </div>
      </div>

      {/* Food Grid - REDESIGNED */}
      <div className="px-4 pt-6 space-y-5">
        {filteredFood.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-kai-grey-100 to-kai-grey-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search className="w-12 h-12 text-kai-grey-300" />
            </div>
            <h3 className="text-xl font-bold text-kai-grey-900 mb-2">Tidak Ada Menu</h3>
            <p className="text-kai-grey-500">Coba kata kunci atau filter lain</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 pb-4">
            {filteredFood.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-300 border-2 border-kai-grey-100 hover:border-kai-primary/20 hover:-translate-y-1"
              >
                <div className="flex gap-4 p-4">
                  {/* Image - REDESIGNED with better aspect ratio */}
                  <div className="w-32 h-32 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                      {item.tags.includes('signature') && (
                        <div className="bg-gradient-to-r from-kai-orange to-kai-orange-dark px-2.5 py-1 rounded-lg shadow-lg">
                          <span className="text-[10px] font-black text-white tracking-wide">SIGNATURE</span>
                        </div>
                      )}
                      {item.tags.includes('popular') && (
                        <div className="bg-gradient-to-r from-kai-purple to-kai-primary px-2.5 py-1 rounded-lg shadow-lg">
                          <span className="text-[10px] font-black text-white tracking-wide">POPULER</span>
                        </div>
                      )}
                    </div>

                    {/* Halal Badge */}
                    {item.isHalal && (
                      <div className="absolute bottom-2 right-2 w-7 h-7 bg-gradient-to-br from-success to-success/90 rounded-full flex items-center justify-center shadow-lg">
                        <Leaf className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content - REDESIGNED with better hierarchy */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="font-black text-kai-grey-900 text-base leading-tight line-clamp-2 group-hover:text-kai-primary transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-kai-grey-600 line-clamp-2 leading-relaxed">
                        {item.description.id}
                      </p>

                      {/* Meta Info - REDESIGNED */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-warning/10 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                          <span className="text-xs font-black text-kai-grey-900">{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-kai-blue-50 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-kai-primary" />
                          <span className="text-xs font-bold text-kai-grey-700">{item.preparationTime}m</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action - REDESIGNED */}
                    <div className="flex items-end justify-between gap-3 mt-3">
                      <div>
                        <p className="text-[10px] font-bold text-kai-grey-500 uppercase tracking-wide mb-0.5">Harga</p>
                        <p className="text-lg font-black text-kai-primary">
                          Rp {(item.price / 1000).toFixed(0)}k
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-5 py-2.5 bg-gradient-to-r from-kai-primary to-kai-purple text-white rounded-xl font-bold text-xs hover:shadow-kai active:scale-95 transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button - ALWAYS VISIBLE */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-40 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <button
            onClick={() => navigate('/food/cart')}
            className={`w-full text-white py-5 rounded-2xl font-black text-lg shadow-premium hover:shadow-glow active:scale-95 transition-all flex items-center justify-between px-6 border-2 border-white/20 ${
              cartCount > 0
                ? 'bg-gradient-to-r from-kai-primary via-kai-purple to-kai-primary'
                : 'bg-gradient-to-r from-kai-grey-600 to-kai-grey-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-kai-orange rounded-full flex items-center justify-center text-xs font-black shadow-lg animate-pulse">
                    {cartCount}
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="text-xs opacity-90 font-bold">
                  {cartCount > 0 ? 'Keranjang Belanja' : 'Keranjang Kosong'}
                </p>
                <p className="text-base font-black">
                  {cartCount > 0 ? `${cartCount} Item Dipilih` : 'Tambah item dulu'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black">
                {cartCount > 0 ? 'Checkout' : 'Lihat'}
              </span>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                →
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
