import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default function LanguageSwitcher() {
  const { currentLang, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 max-h-[400px] overflow-y-auto bg-white rounded-2xl shadow-large border border-kai-grey-200 z-50 overscroll-contain">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-kai-grey-50 transition-colors ${
                  currentLang === lang.code ? 'bg-kai-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`text-sm font-medium ${
                    currentLang === lang.code ? 'text-kai-primary' : 'text-kai-grey-700'
                  }`}>
                    {lang.name}
                  </span>
                </div>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4 text-kai-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
