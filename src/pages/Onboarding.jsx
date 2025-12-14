import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Gift, Star, Clock, Users } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Selamat Datang di KAI Access',
      subtitle: 'Perjalanan Kereta Jadi Lebih Mudah',
      description: 'KAI Access adalah aplikasi resmi PT Kereta Api Indonesia yang menghadirkan pengalaman perjalanan kereta api yang lebih modern, nyaman, dan praktis. Pesan tiket kereta api ke seluruh Indonesia hanya dengan beberapa ketukan.',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200',
      features: [
        { icon: Zap, text: 'Pesan tiket dalam hitungan detik' },
        { icon: Shield, text: 'Pembayaran 100% aman & terpercaya' },
        { icon: Gift, text: 'Kumpulkan KAI Points setiap transaksi' },
      ]
    },
    {
      title: 'Bali Heritage Rail Experience',
      subtitle: 'Jelajahi Warisan Budaya dengan AR',
      description: 'Pengalaman unik yang menggabungkan perjalanan kereta api dengan eksplorasi budaya Bali menggunakan teknologi Augmented Reality. Kunjungi 35+ situs heritage, unlock checkpoint eksklusif, dan raih berbagai badge achievement.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
      features: [
        { icon: Star, text: '35+ lokasi heritage di Bali' },
        { icon: Clock, text: 'Pengalaman 8 jam penuh petualangan' },
        { icon: Users, text: 'Rating 4.9 dari 2.300+ wisatawan' },
      ]
    },
    {
      title: 'Lebih dari Sekedar Tiket',
      subtitle: 'Ekosistem Lengkap Perjalanan Anda',
      description: 'Selain tiket kereta api, KAI Access menyediakan berbagai layanan pendukung perjalanan Anda. Mulai dari booking hotel, pengiriman paket via KAI Logistik, hingga pembayaran PLN dan pulsa - semua dalam satu aplikasi yang mudah digunakan.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      features: [
        { icon: Star, text: 'Hotel partner terpercaya di seluruh Indonesia' },
        { icon: Zap, text: 'Berbagai layanan digital dalam satu aplikasi' },
        { icon: Gift, text: 'Promo & cashback eksklusif setiap hari' },
      ]
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-kai-grey-50 relative overflow-hidden">
      {/* Full-screen Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Skip button */}
        <div className="w-full flex justify-end px-6 pt-8">
          <button
            onClick={handleSkip}
            className="text-white/90 hover:text-white transition-colors text-sm font-semibold px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95"
          >
            Lewati
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-12">
          <div className="max-w-lg mx-auto w-full">
            {/* Text Content */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
                {slide.title}
              </h1>
              <h2 className="text-xl font-semibold text-white/95 mb-4">
                {slide.subtitle}
              </h2>
              <p className="text-base text-white/90 leading-relaxed mb-6">
                {slide.description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {slide.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white/95">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              {/* Dots Indicator */}
              <div className="flex justify-center items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Next/Start Button */}
              <button
                onClick={handleNext}
                className="w-full bg-white text-kai-primary font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]"
              >
                {currentSlide < slides.length - 1 ? 'Selanjutnya' : 'Mulai Sekarang'}
              </button>

              {/* Progress Text */}
              <p className="text-center text-white/60 text-xs font-medium">
                {currentSlide + 1} dari {slides.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
