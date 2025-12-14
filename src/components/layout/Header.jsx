import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';

export default function Header({
  title,
  showBack = true,
  variant = 'blue',
  rightAction = null
}) {
  const navigate = useNavigate();

  const variants = {
    blue: 'bg-kai-primary text-white shadow-kai sticky top-0',
    white: 'bg-white text-kai-grey-900 shadow-soft border-b border-kai-grey-100 sticky top-0',
    transparent: 'bg-transparent text-white fixed top-0 left-0 right-0 z-[60] shadow-none bg-gradient-to-b from-black/50 to-transparent'
  };

  const currentStyle = variants[variant] || variants.blue;

  return (
    <div className={`${currentStyle} z-50 transition-all duration-300`}>
      <div className="safe-area-top">
        <div className="flex items-center justify-between px-5 py-3.5 h-auto min-h-[4.5rem] relative">

          {/* Left: Back Button or Logo */}
          <div className="flex items-center w-1/4">
            {showBack ? (
              <button
                onClick={() => navigate(-1)}
                className={`p-2 -ml-2 rounded-xl transition-all ${variant === 'white'
                  ? 'hover:bg-kai-grey-100 active:bg-kai-grey-200'
                  : 'hover:bg-white/15 active:bg-white/25 backdrop-blur-sm'
                  }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/id/e/ea/KAI_Access_logo.png?20230712080758"
                  alt="KAI Access"
                  className="w-9 h-9 object-contain"
                />
                {variant === 'white' ? (
                  <span className="font-bold text-base tracking-tight text-kai-primary hidden sm:block">KAI Access</span>
                ) : (
                  <span className="font-bold text-base tracking-tight hidden sm:block">KAI Access</span>
                )}
              </div>
            )}
          </div>

          {/* Center: Title */}
          <div className="flex-1 flex justify-center">
            {title && (
              <h1 className="font-semibold text-base text-center truncate px-2 leading-tight">
                {title}
              </h1>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end w-1/4 gap-2">
            {rightAction || (
              !showBack && (
                <button className={`p-2 rounded-xl transition-all relative ${variant === 'white' ? 'hover:bg-kai-grey-100' : 'hover:bg-white/15'
                  }`}>
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-kai-secondary rounded-full border border-current animate-pulse"></span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
