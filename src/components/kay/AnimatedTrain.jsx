import { motion } from 'framer-motion';

export default function AnimatedTrain() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            {/* Train Animation - Continuous Loop */}
            <motion.div
                className="absolute bottom-20"
                initial={{ x: '-100%' }}
                animate={{ x: '100vw' }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 3
                }}
            >
                <svg
                    width="180"
                    height="80"
                    viewBox="0 0 180 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Train Body */}
                    <g>
                        {/* Main Cabin */}
                        <rect x="20" y="20" width="80" height="40" rx="8" fill="#6366F1" />
                        <rect x="20" y="20" width="80" height="40" rx="8" fill="url(#trainGradient)" />

                        {/* Roof */}
                        <path d="M 18 20 L 60 10 L 102 20 Z" fill="#4F46E5" />

                        {/* Windows */}
                        <rect x="28" y="28" width="18" height="16" rx="3" fill="#DBEAFE" opacity="0.9" />
                        <rect x="50" y="28" width="18" height="16" rx="3" fill="#DBEAFE" opacity="0.9" />
                        <rect x="72" y="28" width="18" height="16" rx="3" fill="#DBEAFE" opacity="0.9" />

                        {/* Door */}
                        <rect x="84" y="35" width="12" height="25" rx="2" fill="#312E81" />
                        <circle cx="88" cy="47" r="1.5" fill="#FCD34D" />

                        {/* Logo KAI */}
                        <circle cx="35" cy="52" r="4" fill="#FCD34D" />
                        <text x="35" y="54" fontSize="5" fontWeight="bold" fill="#312E81" textAnchor="middle">K</text>

                        {/* Connector to next cart */}
                        <rect x="100" y="35" width="8" height="12" rx="2" fill="#4F46E5" />

                        {/* Second Cart (smaller) */}
                        <rect x="108" y="28" width="50" height="32" rx="6" fill="#8B5CF6" />
                        <rect x="108" y="28" width="50" height="32" rx="6" fill="url(#trainGradient2)" />

                        {/* Second Cart Windows */}
                        <rect x="115" y="34" width="14" height="12" rx="2" fill="#DBEAFE" opacity="0.8" />
                        <rect x="135" y="34" width="14" height="12" rx="2" fill="#DBEAFE" opacity="0.8" />

                        {/* Wheels - First Cart */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '35px 65px' }}
                        >
                            <circle cx="35" cy="65" r="6" fill="#1F2937" />
                            <circle cx="35" cy="65" r="3" fill="#4B5563" />
                            <line x1="35" y1="62" x2="35" y2="68" stroke="#9CA3AF" strokeWidth="1" />
                            <line x1="32" y1="65" x2="38" y2="65" stroke="#9CA3AF" strokeWidth="1" />
                        </motion.g>

                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '85px 65px' }}
                        >
                            <circle cx="85" cy="65" r="6" fill="#1F2937" />
                            <circle cx="85" cy="65" r="3" fill="#4B5563" />
                            <line x1="85" y1="62" x2="85" y2="68" stroke="#9CA3AF" strokeWidth="1" />
                            <line x1="82" y1="65" x2="88" y2="65" stroke="#9CA3AF" strokeWidth="1" />
                        </motion.g>

                        {/* Wheels - Second Cart */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '120px 63px' }}
                        >
                            <circle cx="120" cy="63" r="5" fill="#1F2937" />
                            <circle cx="120" cy="63" r="2.5" fill="#4B5563" />
                            <line x1="120" y1="60.5" x2="120" y2="65.5" stroke="#9CA3AF" strokeWidth="0.8" />
                        </motion.g>

                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '145px 63px' }}
                        >
                            <circle cx="145" cy="63" r="5" fill="#1F2937" />
                            <circle cx="145" cy="63" r="2.5" fill="#4B5563" />
                            <line x1="145" y1="60.5" x2="145" y2="65.5" stroke="#9CA3AF" strokeWidth="0.8" />
                        </motion.g>

                        {/* Rails */}
                        <line x1="0" y1="70" x2="180" y2="70" stroke="#9CA3AF" strokeWidth="2" opacity="0.5" />
                        <line x1="0" y1="74" x2="180" y2="74" stroke="#9CA3AF" strokeWidth="2" opacity="0.5" />

                        {/* Rail Ties */}
                        <rect x="10" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="30" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="50" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="70" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="90" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="110" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="130" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="150" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />
                        <rect x="170" y="68" width="3" height="8" fill="#78716C" opacity="0.4" />

                        {/* Smoke/Steam Effect */}
                        <motion.g
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.3, 1],
                                y: [0, -5, -10]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                        >
                            <circle cx="15" cy="15" r="6" fill="#E0E7FF" opacity="0.5" />
                            <circle cx="10" cy="10" r="8" fill="#E0E7FF" opacity="0.4" />
                            <circle cx="20" cy="12" r="7" fill="#E0E7FF" opacity="0.3" />
                        </motion.g>
                    </g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="trainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#818CF8" />
                            <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                        <linearGradient id="trainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Second Train - Different Path (Higher) */}
            <motion.div
                className="absolute top-32"
                initial={{ x: '100vw' }}
                animate={{ x: '-100%' }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 5,
                    delay: 12
                }}
            >
                <svg
                    width="150"
                    height="70"
                    viewBox="0 0 150 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Smaller Train Going Opposite Direction */}
                    <g transform="scale(-1, 1) translate(-150, 0)">
                        {/* Main Body */}
                        <rect x="15" y="18" width="70" height="32" rx="6" fill="#EC4899" />
                        <rect x="15" y="18" width="70" height="32" rx="6" fill="url(#trainGradient3)" />

                        {/* Windows */}
                        <rect x="22" y="24" width="14" height="12" rx="2" fill="#FDF2F8" opacity="0.9" />
                        <rect x="40" y="24" width="14" height="12" rx="2" fill="#FDF2F8" opacity="0.9" />
                        <rect x="58" y="24" width="14" height="12" rx="2" fill="#FDF2F8" opacity="0.9" />

                        {/* Roof */}
                        <path d="M 13 18 L 50 10 L 87 18 Z" fill="#DB2777" />

                        {/* Wheels */}
                        <motion.g
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '30px 53px' }}
                        >
                            <circle cx="30" cy="53" r="5" fill="#1F2937" />
                            <circle cx="30" cy="53" r="2.5" fill="#6B7280" />
                        </motion.g>

                        <motion.g
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '70px 53px' }}
                        >
                            <circle cx="70" cy="53" r="5" fill="#1F2937" />
                            <circle cx="70" cy="53" r="2.5" fill="#6B7280" />
                        </motion.g>

                        {/* Rails */}
                        <line x1="0" y1="58" x2="150" y2="58" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.4" />
                        <line x1="0" y1="61" x2="150" y2="61" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.4" />
                    </g>

                    <defs>
                        <linearGradient id="trainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F472B6" />
                            <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Floating Clouds for Atmosphere */}
            <motion.div
                className="absolute top-12 left-10"
                animate={{
                    x: ['0vw', '100vw'],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                <svg width="80" height="40" viewBox="0 0 80 40">
                    <ellipse cx="25" cy="25" rx="20" ry="12" fill="#E0E7FF" opacity="0.3" />
                    <ellipse cx="45" cy="20" rx="18" ry="10" fill="#E0E7FF" opacity="0.3" />
                    <ellipse cx="60" cy="25" rx="15" ry="10" fill="#E0E7FF" opacity="0.3" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-40 right-20"
                animate={{
                    x: ['100vw', '-100vw'],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 10
                }}
            >
                <svg width="100" height="50" viewBox="0 0 100 50">
                    <ellipse cx="30" cy="30" rx="25" ry="15" fill="#DDD6FE" opacity="0.3" />
                    <ellipse cx="55" cy="25" rx="22" ry="12" fill="#DDD6FE" opacity="0.3" />
                    <ellipse cx="75" cy="30" rx="20" ry="13" fill="#DDD6FE" opacity="0.3" />
                </svg>
            </motion.div>
        </div>
    );
}
