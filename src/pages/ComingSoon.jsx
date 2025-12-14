import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { motion } from 'framer-motion';

export default function ComingSoon() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-grey-50 via-white to-kai-blue-50 flex flex-col">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple text-white px-6 pt-12 pb-8 overflow-hidden shadow-large">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="relative flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all active:scale-90 backdrop-blur-md border border-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold pr-10 font-display">
            {t.comingSoon?.title || 'Coming Soon'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-premium p-10 text-center border border-kai-grey-100"
          >
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-gradient-to-br from-kai-primary/10 via-kai-purple/10 to-kai-accent-teal/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-large relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-kai-primary/20 to-kai-purple/20 rounded-full blur-xl animate-pulse" />
              <Clock className="w-16 h-16 text-kai-primary relative z-10" strokeWidth={2.5} />
            </motion.div>

            <h2 className="text-3xl font-bold text-kai-grey-900 mb-4 font-display">
              {t.comingSoon?.title || 'Coming Soon'}
            </h2>

            <p className="text-kai-grey-600 mb-8 text-base leading-relaxed max-w-sm mx-auto">
              {t.comingSoon?.subtitle || 'This feature is under development and will be available for you soon.'}
            </p>

            {/* Feature Highlight */}
            <div className="bg-gradient-to-br from-kai-blue-50 via-kai-purple/10 to-kai-accent-teal/10 rounded-2xl p-6 mb-8 border border-kai-primary/20 shadow-soft">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-kai-primary" />
                <p className="font-bold text-lg text-kai-grey-900">
                  {t.comingSoon?.newFeatures || 'Expect new features'}
                </p>
              </div>
              <p className="text-sm text-kai-grey-700 leading-relaxed">
                {t.comingSoon?.preparing || 'We are preparing the best experience for you'}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-kai-primary"
              />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-kai-purple"
              />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-kai-accent-teal"
              />
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-gradient-to-br from-kai-primary to-kai-purple text-white font-bold py-4 rounded-2xl hover:shadow-premium transition-all shadow-large active:scale-95 flex items-center justify-center gap-3 group"
            >
              <Rocket className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              {t.comingSoon?.backHome || 'Back to Home'}
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-kai-grey-500 mt-6"
          >
            KAI Access - {t.home?.welcome || 'Welcome'}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
