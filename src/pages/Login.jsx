import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('kai_user_logged_in', 'true');

    // Check if user was trying to access a protected page
    const intendedPath = localStorage.getItem('kai_intended_path');
    if (intendedPath) {
      localStorage.removeItem('kai_intended_path');
      navigate(intendedPath);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50 flex flex-col">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple text-white px-6 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="relative max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium p-4"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/id/e/ea/KAI_Access_logo.png?20230712080758"
              alt="KAI Access"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-warning" />
              <h1 className="text-3xl font-bold font-display">KAI Access</h1>
            </div>
            <p className="text-white/90 text-base font-medium">
              {t.auth?.welcome || 'Welcome Back'}
            </p>
            <p className="text-white/70 text-sm mt-1">
              {t.auth?.welcomeDesc || 'Login to continue your journey'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-12">
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-premium p-8 space-y-6 border border-kai-grey-100">
            <div>
              <label className="block text-sm font-bold text-kai-grey-800 mb-3">
                {t.auth?.email || 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kai-grey-400" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all bg-white text-kai-grey-900 font-medium placeholder:text-kai-grey-400"
                  placeholder={t.auth?.email || 'Email'}
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-kai-grey-200 rounded-2xl focus:ring-4 focus:ring-kai-primary/20 focus:border-kai-primary outline-none transition-all bg-white text-kai-grey-900 font-medium placeholder:text-kai-grey-400"
                  placeholder={t.auth?.password || 'Password'}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-kai-primary font-bold hover:text-kai-primary-dark transition-colors"
              >
                {t.auth?.forgotPassword || 'Forgot password?'}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-kai-primary to-kai-purple text-white font-bold py-4 rounded-2xl hover:shadow-premium transition-all active:scale-95 shadow-large flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {t.auth?.loginButton || 'Login'}
            </button>

            <div className="text-center pt-2">
              <p className="text-kai-grey-600 text-sm">
                {t.auth?.noAccount || "Don't have an account?"}{' '}
                <Link
                  to="/register"
                  className="text-kai-primary font-bold hover:text-kai-primary-dark transition-colors"
                >
                  {t.auth?.registerHere || 'Register here'}
                </Link>
              </p>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-kai-grey-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50 text-kai-grey-600 font-semibold">
                  {t.auth?.orLoginWith || 'Or login with'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-kai-grey-200 rounded-2xl hover:border-kai-primary/30 hover:bg-kai-blue-50/30 transition-all active:scale-95 shadow-soft"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-bold text-kai-grey-800">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-kai-grey-200 rounded-2xl hover:border-kai-primary/30 hover:bg-kai-blue-50/30 transition-all active:scale-95 shadow-soft"
              >
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-bold text-kai-grey-800">Facebook</span>
              </button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-kai-grey-500 mt-8"
          >
            © 2025 KAI Access. All rights reserved.
          </motion.p>
        </motion.form>
      </div>
    </div>
  );
}
