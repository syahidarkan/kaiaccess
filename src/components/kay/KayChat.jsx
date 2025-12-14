import { useState, useRef, useEffect } from 'react';
import { Send, Minimize2 } from 'lucide-react';
import { useKayStore } from '../../store/useKayStore';
import { generateKayResponse } from '../../services/ollamaService';
import KayAvatar from './KayAvatar';
import TrainCharacter from './TrainCharacter';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../i18n/translations';

export default function KayChat() {
    const {
        chatHistory, addMessage, isOpen, toggleOpen,
        setAvatarState, setSpeaking, isSpeaking, avatarState
    } = useKayStore();

    const { t } = useTranslation();
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    // Animasi mulut bergerak saat KAY "berbicara" (visual only)
    const animateSpeaking = (text) => {
        setSpeaking(true);

        // Durasi animasi berdasarkan panjang teks (simulasi berbicara)
        const duration = Math.min(text.length * 50, 3000); // Max 3 detik

        setTimeout(() => {
            setSpeaking(false);
            setAvatarState('happy');

            // Kembali ke neutral setelah beberapa detik
            setTimeout(() => {
                setAvatarState('neutral');
            }, 2000);
        }, duration);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg = inputText;
        setInputText('');

        // 1. Add User Message
        addMessage({
            sender: 'user',
            text: userMsg,
            type: 'text'
        });

        // 2. KAY Thinking State
        setIsTyping(true);
        setAvatarState('thinking');

        // 3. Generate Response
        try {
            // Mock context for now - in layout we can pass real props
            const response = await generateKayResponse(userMsg, {
                locationName: 'Bali',
                unlockedCount: 5
            });

            setIsTyping(false);

            addMessage({
                sender: 'kay',
                text: response,
                type: 'text'
            });

            // Animasi berbicara visual saja (tanpa suara)
            animateSpeaking(response);

        } catch (e) {
            console.error(e);
            setIsTyping(false);
            setAvatarState('surprised');
        }
    };

    if (!isOpen) return null;

    const suggestions = [
        t.kay.suggestions.food,
        t.kay.suggestions.history,
        t.kay.suggestions.tourism,
        t.kay.suggestions.attractions
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden">

                    {/* Dark Overlay Background */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={toggleOpen}
                    />

                    {/* Main Content Area - Bottom Sheet Style */}
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-x-0 bottom-0 top-16 bg-white rounded-t-[2.5rem] shadow-premium flex flex-col overflow-hidden"
                    >
                        {/* Header with Avatar - ALWAYS VISIBLE, NEVER COVERED */}
                        <div className="relative shrink-0 bg-gradient-to-br from-kai-primary via-kai-purple to-kai-accent-purple border-b border-white/10 shadow-large overflow-hidden">
                            {/* Drag Handle */}
                            <div className="w-12 h-1.5 bg-white/30 rounded-full mt-4 mx-auto relative z-20" />

                            {/* Close Button */}
                            <button
                                onClick={toggleOpen}
                                className="absolute top-4 right-6 bg-white/20 hover:bg-white/30 text-white p-2.5 rounded-xl transition-all z-30 active:scale-90 backdrop-blur-md border border-white/30 shadow-card"
                            >
                                <Minimize2 className="w-5 h-5" />
                            </button>

                            {/* Train Character - BEHIND Avatar */}
                            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
                                <TrainCharacter expression={avatarState === 'happy' ? 'happy' : avatarState === 'surprised' ? 'excited' : 'neutral'} />
                            </div>

                            {/* KAY Avatar - PROMINENT, ALWAYS VISIBLE */}
                            <div className="relative z-10 flex flex-col items-center pt-4 pb-6">
                                <div className="w-28 h-40 mb-3">
                                    <KayAvatar
                                        size="custom"
                                        expression={avatarState}
                                        isSpeaking={isSpeaking}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white leading-tight">KAY Virtual Guide</h3>
                                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                                    <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg" />
                                    <p className="text-xs text-white/90 font-medium">{t.kay.ready}</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth bg-gradient-to-b from-kai-grey-50 to-white relative">
                            {chatHistory.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <div className="w-20 h-20 bg-kai-blue-50 rounded-3xl flex items-center justify-center mb-4">
                                        <span className="text-4xl">👋</span>
                                    </div>
                                    <p className="text-kai-grey-600 text-sm font-semibold mb-1">{t.kay.greeting}</p>
                                    <p className="text-kai-grey-400 text-xs">{t.kay.askSomething}</p>
                                </div>
                            )}

                            {chatHistory.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-kai-primary to-kai-purple text-white rounded-tr-sm shadow-large'
                                            : 'bg-white text-kai-grey-900 rounded-tl-sm border border-kai-grey-200 shadow-card'
                                    }`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                        <div className={`text-[10px] mt-2 text-right font-medium ${
                                            msg.sender === 'user' ? 'text-white/70' : 'text-kai-grey-400'
                                        }`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white backdrop-blur-sm px-5 py-3 rounded-2xl rounded-tl-sm text-kai-grey-600 text-sm flex items-center gap-2.5 border border-kai-grey-200 shadow-card">
                                        <span className="italic font-medium">{t.kay.thinking}</span>
                                        <span className="flex gap-1">
                                            <motion.span
                                                className="w-1.5 h-1.5 bg-kai-primary rounded-full"
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                            <motion.span
                                                className="w-1.5 h-1.5 bg-kai-purple rounded-full"
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.span
                                                className="w-1.5 h-1.5 bg-kai-accent-teal rounded-full"
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Suggestions & Input */}
                        <div className="bg-white border-t border-kai-grey-100 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] pb-8 safe-area-bottom">
                            {/* Suggestions */}
                            {chatHistory.length < 3 && (
                                <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
                                    {suggestions.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => { setInputText(chip); handleSend(); }}
                                            className="px-4 py-2 bg-gradient-to-br from-kai-blue-50 to-kai-purple/10 text-kai-primary rounded-xl text-xs font-bold whitespace-nowrap border border-kai-primary/20 hover:bg-kai-primary hover:text-white hover:border-kai-primary active:scale-95 transition-all shadow-soft"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input Bar */}
                            <div className="px-4 pb-2">
                                <div className="flex gap-2 items-center bg-kai-grey-50 p-1.5 rounded-2xl border-2 border-kai-grey-200 shadow-soft focus-within:ring-4 focus-within:ring-kai-primary/20 focus-within:border-kai-primary transition-all">
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm placeholder:text-kai-grey-400 text-kai-grey-900 font-medium"
                                        placeholder={t.kay.askSomething}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    />

                                    <button
                                        onClick={handleSend}
                                        disabled={!inputText.trim()}
                                        className="p-3 bg-gradient-to-br from-kai-primary to-kai-purple rounded-xl flex items-center justify-center text-white shadow-large disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-premium hover:scale-105 active:scale-95 transition-all shrink-0"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
