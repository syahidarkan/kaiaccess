import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, Star, ArrowRight, Check, PlayCircle,
  Camera, Award, Users, ChevronDown, Calendar, Ticket,
  Info, Sparkles, Coffee, Train, Music
} from 'lucide-react';
import { route } from '../../data/route';
import { checkpoints } from '../../data/checkpoints';
import { formatPrice } from '../../utils/dateHelpers';
import { isAuthenticated } from '../../utils/auth';
import Header from '../../components/layout/Header';

export default function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      localStorage.setItem('kai_intended_path', '/bali-heritage/booking');
      navigate('/login');
    } else {
      navigate('/bali-heritage/booking');
    }
  };

  const checkpointsList = [
    { title: 'Pura Besakih', time: '08:00 AM', desc: 'The Mother Temple of Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600' },
    { title: 'Tegalalang Terrace', time: '10:30 AM', desc: 'Ancient Subak Irrigation System', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600' },
    { title: 'Ubud Royal Palace', time: '12:00 PM', desc: 'Traditional Balinese Lunch & Dance', img: 'https://images.unsplash.com/photo-1555400038-63f526b1c3b3?w=600' },
    { title: 'Tanah Lot Sunset', time: '05:00 PM', desc: 'Golden Hour Photography', img: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=600' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-kai-grey-900 pb-28">
      {/* Immersive Audio/Visual Header */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Parallax Image */}
        <div
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-12">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4">
              KAI Premium Experience
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-xl leading-tight">
              Kereta<br /> <span className="text-kai-orange">Eksplorasi Bali</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed drop-shadow-md">
              Sebuah perjalanan melintasi waktu, budaya, dan spiritualitas Pulau Dewata dalam kemewahan kereta api kelas dunia.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-kai-grey-500" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        {/* Intro Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 font-display">Lebih Dari Sekedar Perjalanan</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Kami menggabungkan kenyamanan kereta api modern dengan kekayaan sejarah Bali. Dengan teknologi <span className="text-kai-primary font-bold">Augmented Reality (AR)</span>, setiap candi dan sawah yang Anda lewati akan bercerita.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-kai-orange" />
                <span className="font-semibold text-sm">Half Day (5 Jam)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-kai-primary" />
                <span className="font-semibold text-sm">Small Group (Max 12)</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" />
                <span className="font-semibold text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1552422554-0d567c69991b?w=600"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="AR Preview"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white font-bold text-sm">
              Tonton Preview AR
            </div>
          </div>
        </div>

        {/* The Journey Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <span className="text-kai-primary font-bold tracking-widest uppercase text-sm">Itinerary Perjalanan</span>
            <h2 className="text-4xl font-bold mt-2 font-display text-gray-900">Jejak Langkah Para Raja</h2>
            <div className="w-20 h-1 bg-kai-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 md:translate-x-0" />

            <div className="space-y-12">
              {checkpointsList.map((stop, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-8 items-center relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-kai-primary rounded-full border-4 border-white shadow-lg -translate-x-1/2 md:translate-x-[1px] z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ml-10 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <span className="text-kai-orange font-bold font-mono text-sm tracking-wide block mb-1">{stop.time}</span>
                    <h3 className="text-2xl font-bold mb-2">{stop.title}</h3>
                    <p className="text-gray-600 mb-4">{stop.desc}</p>
                    <div className={`flex gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="px-3 py-1 bg-kai-grey-100 rounded-lg text-xs font-semibold text-kai-grey-700">Sightseeing</span>
                      <span className="px-3 py-1 bg-kai-blue-50 text-kai-primary rounded-lg text-xs font-semibold">AR Story</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <img
                      src={stop.img}
                      alt={stop.title}
                      className="w-full aspect-video rounded-2xl shadow-lg object-cover hover:shadow-xl transition-shadow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid - "What You Get" */}
        <div className="py-10">
          <h2 className="text-3xl font-bold mb-10 text-center font-display">Fasilitas Eksklusif</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Train, title: "Royal Train Carriage", desc: "Perjalanan dengan kereta wisata panorama kelas prioritas." },
              { icon: Coffee, title: "Fine Dining Lunch", desc: "Makan siang set menu autentik Bali di atas kereta." },
              { icon: Music, title: "Live Gamelan", desc: "Pertunjukan seni tradisional selama perjalanan." },
              { icon: Camera, title: "Professional Photographer", desc: "Dokumentasi perjalanan oleh fotografer kami." },
              { icon: Sparkles, title: "AR Smart Glass", desc: "Peminjaman kacamata AR untuk pengalaman imersif." },
              { icon: Award, title: "Exclusive Merchandise", desc: "Oleh-oleh premium khas KAI Heritage." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-kai-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-kai-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-br from-kai-grey-900 to-kai-grey-800 rounded-[2.5rem] p-8 md:p-12 text-white my-10 overflow-hidden relative shadow-premium">
          <div className="absolute top-0 right-0 w-64 h-64 bg-kai-primary/20 rounded-full blur-[100px] -mr-20 -mt-20" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <Sparkles className="w-10 h-10 text-kai-orange mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">"Setiap rel memiliki cerita, setiap stasiun memiliki kenangan."</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Bergabunglah dengan ribuan traveler yang telah merasakan magisnya Bali dari perspektif yang berbeda. Bukan sekedar liburan, ini adalah perjalanan spiritual dan budaya.
            </p>
            <div className="flex justify-center gap-4">
              <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-12 h-12 rounded-full border-2 border-white -ml-6" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-white -ml-6" />
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 -ml-6 flex items-center justify-center text-xs font-bold">
                2k+
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Action Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-[60]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Harga Paket</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-kai-primary">Rp500.000</span>
              <span className="text-xs text-gray-400">/pax</span>
            </div>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-kai-orange hover:bg-kai-orange-dark text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <Ticket className="w-5 h-5" />
            Pesan Sekarang
          </button>
        </div>
      </div>

      {/* Floating Header Back Button (Custom) */}
      <Header showBack={true} variant="transparent" />
    </div>
  );
}
