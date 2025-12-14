import { useNavigate } from 'react-router-dom';
import {
  User, Award, ArrowRight, Gift, MapPin, Calendar,
  Settings, LogOut, ChevronRight, Star, Ticket,
  CreditCard, Bell, HelpCircle, Shield, Mail, Phone
} from 'lucide-react';

export default function ProfilePlaceholder() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Perjalanan', value: '3', icon: MapPin },
    { label: 'KAI Points', value: '1,250', icon: Gift },
    { label: 'Badges Earned', value: '8', icon: Award },
  ];

  const menuSections = [
    {
      title: 'Akun Saya',
      items: [
        { icon: User, label: 'Edit Profil', description: 'Kelola informasi pribadi Anda', action: () => navigate('/coming-soon') },
        { icon: CreditCard, label: 'Metode Pembayaran', description: 'Kartu kredit & e-wallet tersimpan', action: () => navigate('/coming-soon') },
        { icon: Ticket, label: 'Riwayat Transaksi', description: 'Lihat semua transaksi Anda', action: () => navigate('/my-booking') },
      ]
    },
    {
      title: 'Heritage Experience',
      items: [
        { icon: Award, label: 'Pencapaian Bali Heritage', description: 'Badge & achievement yang sudah didapat', action: () => navigate('/bali-heritage/profile') },
        { icon: MapPin, label: 'Checkpoint History', description: 'Semua lokasi yang pernah dikunjungi', action: () => navigate('/bali-heritage/profile') },
      ]
    },
    {
      title: 'Pengaturan',
      items: [
        { icon: Bell, label: 'Notifikasi', description: 'Atur preferensi notifikasi', action: () => navigate('/coming-soon') },
        { icon: Shield, label: 'Privasi & Keamanan', description: 'Password & pengaturan keamanan', action: () => navigate('/coming-soon') },
        { icon: HelpCircle, label: 'Bantuan & FAQ', description: 'Pertanyaan umum & customer service', action: () => navigate('/coming-soon') },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-kai-grey-50 pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-kai-primary to-kai-purple text-white px-6 pt-12 pb-16 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Budi Santoso</h2>
                <p className="text-white/80 text-sm">user@kai.id</p>
                <p className="text-white/70 text-xs mt-1">Member sejak Januari 2024</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/coming-soon')}
              className="text-white/80 hover:text-white p-2"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Mail className="w-4 h-4" />
              <span>budisantoso@email.com</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-7890</span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-bold">Akun Terverifikasi</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-card text-center border border-kai-grey-100">
                <div className="w-10 h-10 bg-kai-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-kai-primary" />
                </div>
                <p className="text-2xl font-bold text-kai-grey-900 mb-1">{stat.value}</p>
                <p className="text-xs text-kai-grey-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* KAI Points Card */}
        <div className="bg-gradient-to-br from-kai-purple to-kai-primary rounded-2xl p-5 text-white shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-4 h-4" />
                <p className="text-sm font-medium">KAI Points Anda</p>
              </div>
              <p className="text-3xl font-bold">1,250</p>
              <p className="text-white/70 text-xs mt-1">Setara dengan Rp 125.000</p>
            </div>
            <button
              onClick={() => navigate('/coming-soon')}
              className="bg-white text-kai-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors"
            >
              Tukar
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-white/80 pt-3 border-t border-white/20">
            <span>Kadaluarsa dalam 90 hari</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-sm font-bold text-kai-grey-500 uppercase tracking-wide px-1">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-kai-grey-100">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    onClick={item.action}
                    className="w-full flex items-center gap-4 p-4 hover:bg-kai-grey-50 transition-colors border-b border-kai-grey-100 last:border-0"
                  >
                    <div className="w-10 h-10 bg-kai-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-kai-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-sm text-kai-grey-900">{item.label}</p>
                      <p className="text-xs text-kai-grey-600">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-kai-grey-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-bold text-kai-grey-500 uppercase tracking-wide px-1 mb-3">Aktivitas Terakhir</h3>
          <div className="bg-white rounded-2xl p-4 shadow-card border border-kai-grey-100 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-kai-grey-900">Booking Bali Heritage</p>
                <p className="text-xs text-kai-grey-600">2 hari yang lalu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-kai-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-kai-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-kai-grey-900">Badge Baru: Culture Explorer</p>
                <p className="text-xs text-kai-grey-600">3 hari yang lalu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-kai-grey-900">+50 KAI Points</p>
                <p className="text-xs text-kai-grey-600">5 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
              localStorage.removeItem('kai_user_logged_in');
              navigate('/login');
            }
          }}
          className="w-full bg-white text-error py-3.5 rounded-xl font-bold border border-kai-grey-200 hover:bg-error hover:text-white transition-all shadow-card active:scale-95 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Keluar dari Akun
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-kai-grey-400">
          KAI Access v1.0.0 • © 2024 PT Kereta Api Indonesia
        </p>
      </div>
    </div>
  );
}
