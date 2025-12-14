import { motion } from 'framer-motion';

export default function TrainCharacter({ expression = 'happy' }) {
    const expressions = {
        happy: {
            eyes: { scaleY: 1, y: 0 },
            mouth: { d: "M 35 48 Q 50 58 65 48", stroke: "#FCD34D" },
            blush: true
        },
        neutral: {
            eyes: { scaleY: 1, y: 0 },
            mouth: { d: "M 35 52 L 65 52", stroke: "#9CA3AF" },
            blush: false
        },
        excited: {
            eyes: { scaleY: 1.2, y: -1 },
            mouth: { d: "M 30 48 Q 50 63 70 48", stroke: "#FCD34D" },
            blush: true
        }
    };

    const currentExpression = expressions[expression] || expressions.happy;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Train Character - Behind Avatar with free movement */}
            <motion.div
                animate={{
                    x: [-20, 20, -20],
                    y: [-10, 10, -10],
                    rotate: [-2, 2, -2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
            >
                <svg
                    width="120"
                    height="100"
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-xl"
                >
                    {/* Main Train Body */}
                    <g>
                        {/* Body */}
                        <rect x="20" y="25" width="80" height="50" rx="12" fill="url(#bodyGradient)" />

                        {/* Roof */}
                        <path d="M 18 25 L 60 15 L 102 25 Z" fill="#4F46E5" />

                        {/* Chimney with Steam */}
                        <rect x="48" y="5" width="8" height="12" rx="2" fill="#312E81" />

                        {/* Steam Animation */}
                        <motion.g
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [1, 1.4, 1.6],
                                y: [0, -8, -15]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        >
                            <circle cx="52" cy="3" r="4" fill="#E0E7FF" opacity="0.6" />
                            <circle cx="50" cy="0" r="5" fill="#E0E7FF" opacity="0.5" />
                            <circle cx="54" cy="1" r="4.5" fill="#E0E7FF" opacity="0.4" />
                        </motion.g>

                        {/* Windows with Shine Effect */}
                        <g opacity="0.95">
                            <rect x="28" y="32" width="16" height="18" rx="4" fill="#DBEAFE" />
                            <rect x="48" y="32" width="16" height="18" rx="4" fill="#DBEAFE" />
                            <rect x="68" y="32" width="16" height="18" rx="4" fill="#DBEAFE" />

                            {/* Window Shine */}
                            <rect x="28" y="32" width="6" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />
                            <rect x="48" y="32" width="6" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />
                            <rect x="68" y="32" width="6" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />
                        </g>

                        {/* FACE - Eyes */}
                        <motion.g
                            animate={currentExpression.eyes}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Left Eye */}
                            <circle cx="40" cy="42" r="3.5" fill="#1F2937" />
                            <motion.circle
                                cx="41"
                                cy="41.5"
                                r="1.5"
                                fill="#FFFFFF"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Right Eye */}
                            <circle cx="60" cy="42" r="3.5" fill="#1F2937" />
                            <motion.circle
                                cx="61"
                                cy="41.5"
                                r="1.5"
                                fill="#FFFFFF"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                            />
                        </motion.g>

                        {/* Blush */}
                        {currentExpression.blush && (
                            <g opacity="0.6">
                                <ellipse cx="30" cy="48" rx="4" ry="3" fill="#FCA5A5" />
                                <ellipse cx="70" cy="48" rx="4" ry="3" fill="#FCA5A5" />
                            </g>
                        )}

                        {/* FACE - Mouth */}
                        <motion.path
                            d={currentExpression.mouth.d}
                            stroke={currentExpression.mouth.stroke}
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            initial={false}
                            animate={{ d: currentExpression.mouth.d }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* KAI Logo Badge */}
                        <g>
                            <circle cx="50" cy="62" r="6" fill="#FCD34D" />
                            <text
                                x="50"
                                y="65"
                                fontSize="7"
                                fontWeight="bold"
                                fill="#312E81"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                            >
                                K
                            </text>
                        </g>

                        {/* Door */}
                        <rect x="86" y="45" width="10" height="28" rx="2" fill="#312E81" />
                        <circle cx="88" cy="58" r="1.2" fill="#FCD34D" />

                        {/* Wheels with Rotation Animation */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            style={{ transformOrigin: '35px 78px' }}
                        >
                            <circle cx="35" cy="78" r="7" fill="#1F2937" />
                            <circle cx="35" cy="78" r="4" fill="#4B5563" />
                            <line x1="35" y1="74" x2="35" y2="82" stroke="#9CA3AF" strokeWidth="1.5" />
                            <line x1="31" y1="78" x2="39" y2="78" stroke="#9CA3AF" strokeWidth="1.5" />
                        </motion.g>

                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            style={{ transformOrigin: '65px 78px' }}
                        >
                            <circle cx="65" cy="78" r="7" fill="#1F2937" />
                            <circle cx="65" cy="78" r="4" fill="#4B5563" />
                            <line x1="65" y1="74" x2="65" y2="82" stroke="#9CA3AF" strokeWidth="1.5" />
                            <line x1="61" y1="78" x2="69" y2="78" stroke="#9CA3AF" strokeWidth="1.5" />
                        </motion.g>

                        {/* Shadow */}
                        <ellipse cx="50" cy="86" rx="45" ry="6" fill="#000000" opacity="0.15" />

                        {/* Decorative Stripes */}
                        <rect x="22" y="55" width="76" height="2" fill="#818CF8" opacity="0.4" />
                        <rect x="22" y="60" width="76" height="2" fill="#818CF8" opacity="0.4" />

                        {/* Front Light */}
                        <circle cx="95" cy="38" r="3" fill="#FCD34D" opacity="0.9" />
                        <motion.circle
                            cx="95"
                            cy="38"
                            r="4"
                            fill="#FCD34D"
                            opacity="0.3"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#818CF8" />
                            <stop offset="50%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#4F46E5" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Decorative Sparkles Around Train */}
            <motion.div
                className="absolute"
                style={{ top: '20%', left: '10%' }}
                animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="w-2 h-2 bg-warning rounded-full" />
            </motion.div>

            <motion.div
                className="absolute"
                style={{ top: '30%', right: '15%' }}
                animate={{
                    scale: [0, 1, 0],
                    rotate: [360, 180, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                <div className="w-1.5 h-1.5 bg-kai-accent-teal rounded-full" />
            </motion.div>

            <motion.div
                className="absolute"
                style={{ bottom: '25%', left: '20%' }}
                animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            >
                <div className="w-1 h-1 bg-kai-purple rounded-full" />
            </motion.div>
        </div>
    );
}
