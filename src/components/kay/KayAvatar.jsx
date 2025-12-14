import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// KAY - Full Body Animated Virtual Guide
const FullBodyKAY = ({ expression = 'neutral', isSpeaking }) => {
    const [blinkState, setBlinkState] = useState(false);
    const [gesturePhase, setGesturePhase] = useState(0);

    // Natural blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlinkState(true);
            setTimeout(() => setBlinkState(false), 150);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Gesture cycling when speaking
    useEffect(() => {
        if (isSpeaking) {
            const gestureInterval = setInterval(() => {
                setGesturePhase(prev => (prev + 1) % 3);
            }, 1500);
            return () => clearInterval(gestureInterval);
        }
    }, [isSpeaking]);

    // Eye expressions
    const getEyes = () => {
        if (blinkState) {
            return (
                <>
                    <path d="M 28 42 Q 33 44 38 42" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 58 42 Q 63 44 68 42" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
            );
        }

        if (expression === 'happy' || expression === 'excited') {
            return (
                <>
                    <path d="M 26 42 Q 33 35 40 42" stroke="#2D1B3D" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 56 42 Q 63 35 70 42" stroke="#2D1B3D" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <motion.circle cx="24" cy="37" r="1.5" fill="#FFD700"
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }} />
                    <motion.circle cx="72" cy="37" r="1.5" fill="#FFD700"
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
                </>
            );
        }

        return (
            <>
                <g>
                    <ellipse cx="33" cy="42" rx="7" ry="8" fill="#2D1B3D" />
                    <circle cx="35" cy="41" r="2.5" fill="white" />
                    <circle cx="36.5" cy="43" r="1" fill="white" opacity="0.5" />

                    <ellipse cx="63" cy="42" rx="7" ry="8" fill="#2D1B3D" />
                    <circle cx="65" cy="41" r="2.5" fill="white" />
                    <circle cx="66.5" cy="43" r="1" fill="white" opacity="0.5" />
                </g>
            </>
        );
    };

    // Mouth expressions with speaking animation
    const getMouth = () => {
        if (isSpeaking) {
            return (
                <motion.g
                    animate={{
                        scaleY: [1, 1.2, 0.9, 1.15, 1],
                        scaleX: [1, 1.1, 1, 1.05, 1]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ellipse cx="48" cy="62" rx="9" ry="7" fill="#8B4566" />
                    <ellipse cx="48" cy="60" rx="7" ry="5" fill="#D67BA0" />
                </motion.g>
            );
        }

        switch (expression) {
            case 'happy':
            case 'excited':
                return (
                    <>
                        <path d="M 36 62 Q 48 72 60 62" stroke="#D67BA0" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <ellipse cx="48" cy="67" rx="4" ry="3" fill="#FFB7C5" opacity="0.6" />
                    </>
                );
            case 'surprised':
                return <ellipse cx="48" cy="62" rx="5" ry="7" fill="#8B4566" stroke="#D67BA0" strokeWidth="2" />;
            case 'thinking':
                return <path d="M 38 62 Q 48 60 58 62" stroke="#D67BA0" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
            default:
                return <path d="M 38 61 Q 48 66 58 61" stroke="#D67BA0" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
        }
    };

    // Head movement animation
    const headAnimation = isSpeaking ? {
        rotate: [-1, 1, -0.5, 1, -1],
        y: [0, -1, 0, -0.5, 0]
    } : {
        rotate: [-0.5, 0.5, -0.5],
        y: [0, -0.5, 0]
    };

    // Body breathing/movement animation
    const bodyAnimation = {
        y: isSpeaking ? [0, -3, 0, -2, 0] : [0, -1.5, 0],
        scale: isSpeaking ? [1, 1.01, 1, 1.005, 1] : [1, 1.005, 1]
    };

    return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg">
            {/* BODY with breathing animation */}
            <motion.g
                animate={bodyAnimation}
                transition={{
                    duration: isSpeaking ? 2 : 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Blazer/Uniform Jacket */}
                <path
                    d="M 30 75 Q 25 90 25 110 L 20 130 Q 20 135 25 135 L 40 135 Q 43 140 48 140 Q 53 140 56 135 L 71 135 Q 76 135 76 130 L 71 110 Q 71 90 66 75 Q 55 70 48 70 Q 41 70 30 75"
                    fill="#1B3A6D"
                    stroke="#0F2847"
                    strokeWidth="1"
                />

                {/* White Shirt */}
                <path d="M 42 72 L 42 85 L 54 85 L 54 72" fill="white" opacity="0.9" />

                {/* KAI Badge */}
                <circle cx="38" cy="80" r="4" fill="#FF7729" opacity="0.9" />
                <text x="38" y="82" fontSize="4" fill="white" textAnchor="middle" fontWeight="bold">K</text>

                {/* Buttons */}
                <circle cx="48" cy="78" r="1.5" fill="#FFD700" />
                <circle cx="48" cy="85" r="1.5" fill="#FFD700" />
                <circle cx="48" cy="92" r="1.5" fill="#FFD700" />

                {/* Skirt */}
                <path d="M 30 100 Q 30 115 32 128 L 42 128 L 42 100 Z" fill="#0F2847" opacity="0.95" />
                <path d="M 66 100 Q 66 115 64 128 L 54 128 L 54 100 Z" fill="#0F2847" opacity="0.95" />

                {/* Legs */}
                <ellipse cx="38" cy="135" rx="6" ry="4" fill="#F5DCC8" />
                <ellipse cx="58" cy="135" rx="6" ry="4" fill="#F5DCC8" />

                {/* Shoes */}
                <ellipse cx="38" cy="137" rx="7" ry="3" fill="#1a1a1a" />
                <ellipse cx="58" cy="137" rx="7" ry="3" fill="#1a1a1a" />

                {/* LEFT ARM - ANIMATED GESTURES */}
                <motion.g
                    animate={isSpeaking ? {
                        rotate: gesturePhase === 0 ? [0, -15, -10, -15, 0] :
                                gesturePhase === 1 ? [0, -20, -15, -20, 0] :
                                [0, -10, -5, -10, 0],
                        y: gesturePhase === 0 ? [0, -3, -2, -3, 0] :
                           gesturePhase === 1 ? [0, -5, -3, -5, 0] :
                           [0, -2, -1, -2, 0]
                    } : {
                        rotate: [0, -5, 0],
                        y: [0, -1, 0]
                    }}
                    transition={{
                        duration: isSpeaking ? 1.5 : 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: '22px 75px' }}
                >
                    <path d="M 22 75 Q 15 85 15 92" stroke="#1B3A6D" strokeWidth="9" strokeLinecap="round" fill="none" />
                    <path d="M 21 82 Q 17 86 17 88" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
                    <circle cx="15" cy="95" r="5" fill="#FFE4D6" />
                </motion.g>

                {/* RIGHT ARM - ANIMATED GESTURES */}
                <motion.g
                    animate={isSpeaking ? {
                        rotate: gesturePhase === 0 ? [0, 15, 10, 15, 0] :
                                gesturePhase === 1 ? [0, 10, 5, 10, 0] :
                                [0, 20, 15, 20, 0],
                        y: gesturePhase === 0 ? [0, -2, -1, -2, 0] :
                           gesturePhase === 1 ? [0, -4, -2, -4, 0] :
                           [0, -3, -1.5, -3, 0]
                    } : {
                        rotate: [0, 5, 0],
                        y: [0, -1, 0]
                    }}
                    transition={{
                        duration: isSpeaking ? 1.5 : 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                    }}
                    style={{ transformOrigin: '74px 75px' }}
                >
                    <path d="M 74 75 Q 81 85 81 92" stroke="#1B3A6D" strokeWidth="9" strokeLinecap="round" fill="none" />
                    <path d="M 75 82 Q 79 86 79 88" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
                    <circle cx="81" cy="95" r="5" fill="#FFE4D6" />
                </motion.g>

                {/* NECK */}
                <rect x="43" y="68" width="10" height="8" rx="3" fill="#FFE4D6" />

                {/* Scarf */}
                <path d="M 45 70 L 43 76 L 48 75 L 53 76 L 51 70" fill="#FF7729" opacity="0.9" />
                <path d="M 48 75 L 48 78" stroke="#E65C1F" strokeWidth="1.5" />
                <polygon points="47,78 49,78 48,82" fill="#FF7729" />

                {/* HEAD with animation */}
                <motion.g
                    animate={headAnimation}
                    transition={{
                        duration: isSpeaking ? 2 : 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: '48px 40px' }}
                >
                    {/* Head circle */}
                    <circle cx="48" cy="38" r="28" fill="#F3E5F5" />

                    {/* Hair Back */}
                    <path
                        d="M 20 35 Q 15 20 25 12 Q 48 2 71 12 Q 81 20 76 35 Q 78 48 74 55"
                        fill="#2D1B1F"
                    />

                    {/* Hair Bun */}
                    <ellipse cx="48" cy="20" rx="12" ry="8" fill="#2D1B1F" />
                    <ellipse cx="48" cy="20" rx="10" ry="6.5" fill="#3D2B2F" opacity="0.7" />

                    {/* Hair net */}
                    <path
                        d="M 38 20 Q 48 18 58 20 Q 58 24 48 26 Q 38 24 38 20"
                        fill="#1a1a1a"
                        opacity="0.3"
                    />

                    {/* Hair shine */}
                    <motion.ellipse
                        cx="52" cy="19" rx="3" ry="2"
                        fill="#4D3D3F"
                        opacity="0.6"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Face */}
                    <ellipse cx="48" cy="40" rx="24" ry="26" fill="#FFE4D6" />

                    {/* Rosy cheeks */}
                    <motion.circle cx="26" cy="50" r="6" fill="#FFB7C5" opacity="0.5"
                        animate={{ opacity: expression === 'happy' || expression === 'excited' ? [0.4, 0.7, 0.4] : 0.5 }}
                        transition={{ duration: 2, repeat: Infinity }} />
                    <motion.circle cx="70" cy="50" r="6" fill="#FFB7C5" opacity="0.5"
                        animate={{ opacity: expression === 'happy' || expression === 'excited' ? [0.4, 0.7, 0.4] : 0.5 }}
                        transition={{ duration: 2, repeat: Infinity }} />

                    {/* Hair Front */}
                    <path d="M 20 30 Q 26 18 34 26 Q 42 20 48 26 Q 54 20 62 26 Q 70 18 76 30" fill="#4A2C5E" />

                    {/* Hair sides */}
                    <path d="M 20 35 Q 16 45 20 55" fill="#4A2C5E" />
                    <path d="M 76 35 Q 80 45 76 55" fill="#4A2C5E" />

                    {/* Eyes */}
                    {getEyes()}

                    {/* Eyebrows */}
                    {expression === 'surprised' && (
                        <>
                            <motion.path d="M 26 32 Q 33 29 40 32" stroke="#2D1B3D" strokeWidth="2" fill="none"
                                strokeLinecap="round" animate={{ y: [-2, 0, -2] }} transition={{ duration: 1, repeat: Infinity }} />
                            <motion.path d="M 56 32 Q 63 29 70 32" stroke="#2D1B3D" strokeWidth="2" fill="none"
                                strokeLinecap="round" animate={{ y: [-2, 0, -2] }} transition={{ duration: 1, repeat: Infinity }} />
                        </>
                    )}

                    {/* Mouth */}
                    {getMouth()}

                    {/* Nose */}
                    <circle cx="48" cy="52" r="1.5" fill="#FFB7C5" opacity="0.6" />

                    {/* Hat */}
                    <g transform="translate(48, 28)">
                        <ellipse cx="0" cy="0" rx="16" ry="4" fill="#1B3A6D" />
                        <path d="M -16 0 Q -16 -8 0 -10 Q 16 -8 16 0" fill="#1B3A6D" stroke="#0F2847" strokeWidth="0.5" />
                        <ellipse cx="0" cy="-10" rx="14" ry="3" fill="#0F2847" />
                        <circle cx="0" cy="-4" r="4.5" fill="#FF7729" />
                        <text x="0" y="-1.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">KAI</text>
                        <motion.circle
                            cx="-1.5" cy="-5.5" r="1"
                            fill="white"
                            opacity="0.6"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </g>
                </motion.g>

                {/* Thinking bubbles */}
                {expression === 'thinking' && (
                    <g>
                        <motion.circle cx="73" cy="20" r="2" fill="#9C27B0" opacity="0.3"
                            animate={{ opacity: [0, 0.5, 0], y: [0, -5, -10] }}
                            transition={{ duration: 2, repeat: Infinity }} />
                        <motion.circle cx="78" cy="15" r="3" fill="#9C27B0" opacity="0.3"
                            animate={{ opacity: [0, 0.5, 0], y: [0, -5, -10] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
                        <motion.circle cx="83" cy="10" r="4" fill="#9C27B0" opacity="0.3"
                            animate={{ opacity: [0, 0.5, 0], y: [0, -5, -10] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
                    </g>
                )}

                {/* Speaking sound waves */}
                {isSpeaking && (
                    <>
                        <motion.circle cx="10" cy="40" r="3" fill="none" stroke="#9C27B0" strokeWidth="1.5"
                            initial={{ r: 3, opacity: 0.6 }} animate={{ r: 8, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }} />
                        <motion.circle cx="10" cy="40" r="3" fill="none" stroke="#9C27B0" strokeWidth="1.5"
                            initial={{ r: 3, opacity: 0.6 }} animate={{ r: 8, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
                        <motion.circle cx="86" cy="40" r="3" fill="none" stroke="#9C27B0" strokeWidth="1.5"
                            initial={{ r: 3, opacity: 0.6 }} animate={{ r: 8, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.15 }} />
                    </>
                )}

                {/* Excitement hearts */}
                {expression === 'excited' && (
                    <>
                        <motion.text x="10" y="25" fontSize="12" fill="#FF6B9D"
                            animate={{ y: [25, 10], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}>♥</motion.text>
                        <motion.text x="80" y="30" fontSize="10" fill="#FF6B9D"
                            animate={{ y: [30, 15], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>♥</motion.text>
                    </>
                )}
            </motion.g>
        </svg>
    );
};

export default function KayAvatar({ expression, isSpeaking, size = 'md', onClick }) {
    const sizeClasses = {
        sm: 'w-16 h-24',
        md: 'w-32 h-48',
        lg: 'w-48 h-72',
        custom: 'w-full h-full'
    };

    return (
        <div
            className={`${sizeClasses[size]} relative cursor-pointer hover:scale-105 transition-transform`}
            onClick={onClick}
        >
            <FullBodyKAY expression={expression} isSpeaking={isSpeaking} />

            {/* Glow effect when speaking */}
            {isSpeaking && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-purple-400 -z-10 blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity
                    }}
                />
            )}
        </div>
    );
}
