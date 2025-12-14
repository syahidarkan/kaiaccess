import { useEffect, useState } from 'react';
import { useKayStore } from '../../store/useKayStore';
import { useJourneyStore } from '../../store/useJourneyStore';
import KayAvatar from './KayAvatar';
import { MessageCircle, Lock } from 'lucide-react';
import { useKayTriggers } from '../../hooks/useKayTriggers';

export default function KayFab({ showWelcomeNotification = false }) {
    const { toggleOpen, isOpen, avatarState, isSpeaking, unreadCount, addMessage } = useKayStore();
    const { isJourneyActive } = useJourneyStore();
    const { checkTriggers } = useKayTriggers();
    const [showNotification, setShowNotification] = useState(false);
    const [showDisabledMessage, setShowDisabledMessage] = useState(false);

    const isKayActive = isJourneyActive();

    useEffect(() => {
        if (showWelcomeNotification && isKayActive) {
            setShowNotification(true);

            setTimeout(() => {
                addMessage({
                    sender: 'kay',
                    text: "Halo! Aku KAY, pramugari virtual kamu untuk perjalanan ini! Kereta sudah mulai bergerak nih. Aku siap membantu kamu selama 5 jam perjalanan kita mengelilingi Bali. Ada yang bisa aku bantu? 🚄✨",
                    type: 'text'
                });
            }, 500);

            setTimeout(() => setShowNotification(false), 5000);
        }
    }, [showWelcomeNotification, isKayActive]);

    const handleClick = () => {
        if (!isKayActive) {
            setShowDisabledMessage(true);
            setTimeout(() => setShowDisabledMessage(false), 3000);
            return;
        }
        toggleOpen();
    };

    if (isOpen) return null;

    return (
        <>
            {/* Welcome Notification */}
            {showNotification && isKayActive && (
                <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-500">
                    <div className="bg-gradient-to-r from-kai-primary to-kai-purple rounded-2xl p-4 shadow-large border-2 border-white/20 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                <KayAvatar size="xs" expression="excited" />
                            </div>
                            <div className="flex-1 text-white">
                                <p className="font-bold text-sm">KAY Sekarang Beroperasi! 🎉</p>
                                <p className="text-xs text-white/80">Aku siap membantu perjalanan kamu selama 5 jam ke depan</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Disabled Message */}
            {showDisabledMessage && (
                <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-500">
                    <div className="bg-kai-grey-800 rounded-2xl p-4 shadow-large">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-kai-grey-700 flex items-center justify-center flex-shrink-0">
                                <Lock className="w-5 h-5 text-kai-grey-400" />
                            </div>
                            <div className="flex-1 text-white">
                                <p className="font-bold text-sm">Virtual Guide Belum Tersedia</p>
                                <p className="text-xs text-kai-grey-300">KAY akan aktif saat perjalanan dimulai</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handleClick}
                className="fixed bottom-24 right-6 z-50 group"
            >
                <div className="relative">
                    {/* Avatar Container */}
                    <div className={`w-16 h-16 rounded-full shadow-large border-4 overflow-hidden transform transition-all group-hover:scale-110 flex items-center justify-center ${isKayActive ? 'bg-white border-white' : 'bg-kai-grey-200 border-kai-grey-300 opacity-70'}`}>
                        {isKayActive ? (
                            <KayAvatar
                                size="sm"
                                expression={unreadCount > 0 ? 'excited' : avatarState}
                                isSpeaking={isSpeaking}
                            />
                        ) : (
                            <Lock className="w-6 h-6 text-kai-grey-500" />
                        )}
                    </div>

                    {/* Unread Badge */}
                    {unreadCount > 0 && isKayActive && (
                        <div className="absolute -top-1 -right-1 bg-kai-secondary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </div>
                    )}

                    {/* Status ring */}
                    {isKayActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-success opacity-20 animate-ping pointer-events-none"></div>
                    )}

                    {/* Active/Inactive indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${isKayActive ? 'bg-success' : 'bg-kai-grey-500'}`}>
                        {isKayActive ? (
                            <span className="text-white text-[10px] font-bold">✓</span>
                        ) : (
                            <Lock className="w-2.5 h-2.5 text-white" />
                        )}
                    </div>
                </div>

                {/* Label Tooltip */}
                <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl shadow-medium text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isKayActive ? 'bg-white text-kai-grey-700' : 'bg-kai-grey-800 text-kai-grey-300'}`}>
                    {isKayActive ? 'Chat with KAY' : 'KAY (Perjalanan Belum Dimulai)'}
                </div>
            </button>
        </>
    );
}
