import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, ArrowLeft, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { motion } from 'framer-motion';
import { saveAuthUser } from '../utils/auth';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(t.auth?.passwordMismatch || 'Passwords do not match!');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      totalJourneys: 0,
      totalCheckpoints: 0,
      favoriteCheckpoints: [],
      joinedAt: new Date().toISOString(),
      settings: {
        demoMode: false,
        language: 'id',
        notifications: true,
      },
    };

    saveAuthUser(userData);
    localStorage.setItem('kai_user_logged_in', 'true');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple text-white px-6 pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="relative max-w-md mx-auto">
          <Link to="/login" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-5 border border-white/20 shadow-large">
              <UserPlus className="w-10 h-10" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-warning" />
              <h1 className="text-3xl font-bold font-display">{t.auth?.createAccount || 'Create Account'}</h1>
            </div>
            <p className="text-white/80 text-sm">{t.auth?.createAccountDesc || 'Start your adventure with KAI Access'}</p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 -mt-8 pb-8">
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-premium p-8 space-y-5 border border-kai-grey-100">
            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.name || 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-medium placeholder:text-kai-grey-400"
                  placeholder={t.auth?.name || 'Full Name'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.email || 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-medium placeholder:text-kai-grey-400"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.phone || 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-medium placeholder:text-kai-grey-400"
                  placeholder="+62 xxx xxxx xxxx"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.password || 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-medium placeholder:text-kai-grey-400"
                  placeholder={t.auth?.passwordPlaceholder || 'Minimum 8 characters'}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.confirmPassword || 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all font-medium placeholder:text-kai-grey-400"
                  placeholder={t.auth?.confirmPassword || 'Confirm Password'}
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-5 h-5 mt-0.5 text-kai-primary border-kai-grey-300 rounded-lg focus:ring-kai-primary focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-kai-grey-700 leading-relaxed">
                {t.auth?.agreeTerms || 'I agree with the'}{' '}
                <Link to="/terms" className="text-kai-primary font-bold hover:text-kai-primary-dark">
                  {t.auth?.termsConditions || 'terms & conditions'}
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-kai-primary to-kai-purple text-white font-bold py-4 rounded-2xl hover:shadow-premium transition-all active:scale-95 shadow-large flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              {t.auth?.registerButton || 'Register'}
            </button>

            <div className="text-center pt-2">
              <p className="text-kai-grey-600 text-sm">
                {t.auth?.haveAccount || 'Already have an account?'}{' '}
                <Link
                  to="/login"
                  className="text-kai-primary font-bold hover:text-kai-primary-dark transition-colors"
                >
                  {t.auth?.loginHere || 'Login here'}
                </Link>
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-kai-grey-500 mt-6"
          >
            © 2025 KAI Access. All rights reserved.
          </motion.p>
        </motion.form>
      </div>
    </div>
  );
}
