import { useEffect, useRef } from 'react';
import { useKayStore } from '../store/useKayStore';
import { useCheckpointStore } from '../store/useCheckpointStore';
import { useJourneyStore } from '../store/useJourneyStore';
import { calculateDistance } from '../utils/distance';

// Cooldown constants
const TRIGGER_COOLDOWNS = {
    NEAR_CHECKPOINT: 60 * 60 * 1000, // 1 hour per specific checkpoint
    LOCATION_SUGGESTION: 30 * 60 * 1000, // 30 mins untuk saran lokasi
    FOOD_SUGGESTION: 2 * 60 * 60 * 1000, // 2 jam untuk saran makanan
    TIME_GREETING: 12 * 60 * 60 * 1000, // 12 jam untuk greeting
    TIME_SUGGESTION: 4 * 60 * 60 * 1000, // 4 jam untuk suggestion
    MILESTONE: 365 * 24 * 60 * 60 * 1000, // 1 TAHUN - sekali selamanya per milestone!
    IDLE: 15 * 60 * 1000, // 15 mins
    WELCOME: 24 * 60 * 60 * 1000 // 1 day
};

// Popular Bali areas dengan koordinat
const BALI_AREAS = {
    ubud: {
        name: 'Ubud',
        center: { lat: -8.5069, lng: 115.2625 },
        radius: 5, // km
        messages: [
            "Eh kamu lagi di Ubud ya? Ada banyak tempat keren di sini! Mau aku kasih rekomendasi makanan atau tempat wisata? 🌴",
            "Ubud vibes-nya bagus ya! Kalau laper, coba Babi Guling Ibu Oka atau kafe-kafe di Jalan Hanoman. Mau rekomendasi?",
            "Ubud nih! Perfect buat cari oleh-oleh di Art Market atau jalan ke Monkey Forest. Udah mampir ke mana aja?"
        ]
    },
    seminyak: {
        name: 'Seminyak',
        center: { lat: -8.6917, lng: 115.1683 },
        radius: 3,
        messages: [
            "Seminyak! Sunset-nya cantik nih. Mau coba beach club gak? Potato Head atau Ku De Ta recommended banget! 🌅",
            "Lagi di Seminyak? Perfect buat makan siang di restoran tepi pantai. Mau rekomendasi tempat makan enak?",
            "Seminyak! Kalau sore nanti sunset-nya epic. Mau aku kasih tau beach club terbaik?"
        ]
    },
    kuta: {
        name: 'Kuta',
        center: { lat: -8.7182, lng: 115.1690 },
        radius: 3,
        messages: [
            "Kuta! Pantainya rame tapi seru. Kalau mau surfing, ini tempatnya. Atau cuma mau liat sunset juga oke! 🏄",
            "Lagi di Kuta? Hati-hati barang ya, rame soalnya. Mau cari makan enak atau mau ke pantai?",
            "Kuta Beach! Sunset jam 6 sore paling bagus. Jangan lupa foto-foto ya!"
        ]
    },
    sanur: {
        name: 'Sanur',
        center: { lat: -8.6981, lng: 115.2619 },
        radius: 3,
        messages: [
            "Sanur pantainya tenang, cocok banget buat santai. Sunrise-nya cantik loh! Udah sarapan belum? 🌄",
            "Lagi di Sanur? Mau nyoba watersport atau cuma mau jalan-jalan santai di beachfront?",
            "Sanur vibes-nya chill! Ada banyak cafe tepi pantai yang enak buat nongkrong."
        ]
    },
    uluwatu: {
        name: 'Uluwatu',
        center: { lat: -8.8290, lng: 115.0854 },
        radius: 4,
        messages: [
            "Uluwatu! Jangan lupa nonton Kecak dance jam 6 sore ya. Dan hati-hati monyet suka nyolong barang! 🐒",
            "Lagi di Uluwatu? Pemandangan tebing-nya epic! Mau aku kasih tau spot foto terbaik?",
            "Uluwatu keren! Kalau laper, ada banyak warung seafood di Single Fin atau Blue Point. Mau rekomendasi?"
        ]
    },
    nusaDua: {
        name: 'Nusa Dua',
        center: { lat: -8.8095, lng: 115.2308 },
        radius: 3,
        messages: [
            "Nusa Dua! Resort area yang mewah. Pantainya bersih dan tenang. Perfect buat relax! 🏖️",
            "Lagi di Nusa Dua? Ada water blow yang keren, air laut nyembur tinggi banget!",
            "Nusa Dua pantainya private dan bersih. Mau coba watersport atau cuma mau nyantai di beach?"
        ]
    },
    canggu: {
        name: 'Canggu',
        center: { lat: -8.6481, lng: 115.1364 },
        radius: 3,
        messages: [
            "Canggu! Surfer paradise nih. Vibes-nya young dan vibrant. Udah coba kafe-kafe aesthetic di sini? ☕",
            "Lagi di Canggu? Mau surfing atau cuma mau nongkrong di beach club? Banyak pilihan!",
            "Canggu keren buat digital nomad! Banyak coworking space dan cafe aesthetic."
        ]
    },
    denpasar: {
        name: 'Denpasar',
        center: { lat: -8.6705, lng: 115.2126 },
        radius: 5,
        messages: [
            "Denpasar! Mau coba kuliner lokal? Nasi Jinggo cuma 5 ribu, enak banget! 🍛",
            "Lagi di Denpasar? Ada Pasar Badung buat cari oleh-oleh atau Bajra Sandhi Monument buat foto.",
            "Denpasar ibu kota nya Bali. Mau cari makanan lokal authentic atau shopping?"
        ]
    }
};

export const useKayTriggers = () => {
    const { addMessage, setOpen, setAvatarState } = useKayStore();
    const { checkpoints, isUnlocked } = useCheckpointStore();
    const { activeJourney } = useJourneyStore();

    // Local state for tracking trigger timestamps
    const historyRef = useRef({});
    const lastLocationRef = useRef(null);
    const currentAreaRef = useRef(null);

    // Helper to check cooldown
    const canTrigger = (id, type) => {
        const key = `${type}-${id}`;
        const lastTime = historyRef.current[key];
        const now = Date.now();
        const cooldown = TRIGGER_COOLDOWNS[type] || 60000;

        if (!lastTime || (now - lastTime > cooldown)) {
            return true;
        }
        return false;
    };

    const registerTrigger = (id, type) => {
        historyRef.current[`${type}-${id}`] = Date.now();
    };

    // Check if user is in a known area
    const checkArea = (location) => {
        for (const [key, area] of Object.entries(BALI_AREAS)) {
            const dist = calculateDistance(location, area.center);
            if (dist <= area.radius) {
                // User masuk ke area baru
                if (currentAreaRef.current !== key && canTrigger(key, 'LOCATION_SUGGESTION')) {
                    currentAreaRef.current = key;
                    const message = area.messages[Math.floor(Math.random() * area.messages.length)];

                    addMessage({
                        sender: 'kay',
                        text: message,
                        type: 'text'
                    });
                    setAvatarState('excited');
                    registerTrigger(key, 'LOCATION_SUGGESTION');
                }
                return true;
            }
        }

        // User keluar dari area yang dikenal
        if (currentAreaRef.current) {
            currentAreaRef.current = null;
        }
        return false;
    };

    // 1. Location Trigger Logic (GPS-aware)
    const checkTriggers = (location) => {
        if (!location) return;
        lastLocationRef.current = location;

        // Check 1: Area awareness - Proactive suggestions
        checkArea(location);

        // Check 2: Near Checkpoints - Saran checkpoint terdekat
        const nearbyCheckpoints = checkpoints
            .map(cp => ({
                ...cp,
                distance: calculateDistance(location, cp.coordinates)
            }))
            .filter(cp => cp.distance <= 0.5) // dalam radius 500 meter
            .sort((a, b) => a.distance - b.distance);

        if (nearbyCheckpoints.length > 0) {
            const nearest = nearbyCheckpoints[0];

            if (canTrigger(nearest.id, 'NEAR_CHECKPOINT')) {
                const unlocked = isUnlocked(nearest.id);
                const distanceMeters = Math.round(nearest.distance * 1000);

                let text;
                if (unlocked) {
                    text = `Eh! Kita deket ${nearest.name} nih, tempat yang udah kamu unlock! Mau cerita lagi tentang sejarahnya? 🏛️`;
                } else {
                    text = `Wow! ${nearest.name} cuma ${distanceMeters} meter dari sini! Tempat bersejarah banget. Mau aku jelasin sekarang? 📍`;
                }

                addMessage({
                    sender: 'kay',
                    text: text,
                    type: 'text'
                });
                setAvatarState('excited');
                registerTrigger(nearest.id, 'NEAR_CHECKPOINT');
            }
        }
    };

    // 2. Time Triggers (Proactive berdasarkan waktu)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const h = now.getHours();
            const location = lastLocationRef.current;
            const area = currentAreaRef.current;

            // Morning greeting (7:00-9:00)
            if (h >= 7 && h < 9 && canTrigger('morning', 'TIME_GREETING')) {
                const messages = [
                    "Selamat pagi! Udah ready buat explore Bali hari ini? ☀️",
                    "Pagi! Cuaca cerah nih, perfect buat jalan-jalan. Mau ke mana kita hari ini? 🌅",
                    "Good morning! Udah sarapan? Kalau belum, aku bisa kasih rekomendasi tempat sarapan enak!"
                ];
                addMessage({
                    sender: 'kay',
                    text: messages[Math.floor(Math.random() * messages.length)],
                    type: 'text'
                });
                registerTrigger('morning', 'TIME_GREETING');
            }

            // Lunch Time (11:30-13:00)
            if (h >= 11 && h < 13 && canTrigger('lunch', 'FOOD_SUGGESTION')) {
                const areaName = area ? BALI_AREAS[area].name : 'sini';
                const messages = [
                    `Udah jam ${h}:${now.getMinutes()} nih! Lapar gak? Ada warung enak deket ${areaName} loh 🍛`,
                    `Lunch time! Mau coba makanan khas Bali? Aku punya rekomendasi di ${areaName}!`,
                    `Waktunya makan siang! Di ${areaName} ada banyak pilihan enak. Mau saran?`
                ];
                addMessage({
                    sender: 'kay',
                    text: messages[Math.floor(Math.random() * messages.length)],
                    type: 'text'
                });
                registerTrigger('lunch', 'FOOD_SUGGESTION');
            }

            // Afternoon rest (14:00-15:00) - Saran istirahat atau aktivitas santai
            if (h >= 14 && h < 15 && canTrigger('afternoon', 'TIME_SUGGESTION')) {
                const messages = [
                    "Siang panas nih! Mau istirahat dulu di cafe atau tetap lanjut explore? ☕",
                    "Jam segini biasanya panas. Mau aku cariin tempat sejuk buat istirahat?",
                    "Perfect time buat spa atau massage nih. Capek gak dari jalan-jalan?"
                ];
                addMessage({
                    sender: 'kay',
                    text: messages[Math.floor(Math.random() * messages.length)],
                    type: 'text'
                });
                registerTrigger('afternoon', 'TIME_SUGGESTION');
            }

            // Sunset reminder (17:00-17:30)
            if (h >= 17 && h < 18 && canTrigger('sunset', 'TIME_SUGGESTION')) {
                const areaName = area ? BALI_AREAS[area].name : 'lokasi kamu';
                const messages = [
                    `Sunset sebentar lagi nih! Di ${areaName} ada spot bagus buat liat sunset loh 🌅`,
                    `Mau ngejar sunset? Jam 6 nanti perfect! Aku bisa kasih tau spot terbaik.`,
                    `Golden hour! Perfect buat foto-foto. Mau saran tempat sunset terbaik?`
                ];
                addMessage({
                    sender: 'kay',
                    text: messages[Math.floor(Math.random() * messages.length)],
                    type: 'text'
                });
                setAvatarState('excited');
                registerTrigger('sunset', 'TIME_SUGGESTION');
            }

            // Dinner Time (18:30-20:00)
            if (h >= 18 && h < 20 && canTrigger('dinner', 'FOOD_SUGGESTION')) {
                const areaName = area ? BALI_AREAS[area].name : 'area kamu';
                const messages = [
                    `Waktunya dinner! Ada resto enak di ${areaName} nih. Mau fine dining atau street food? 🍽️`,
                    `Lapar? Aku bisa rekomendasiin tempat makan malam enak! Mood nya gimana, romantic atau casual?`,
                    `Dinner time! Di ${areaName} banyak pilihan. Mau seafood, western, atau masakan lokal?`
                ];
                addMessage({
                    sender: 'kay',
                    text: messages[Math.floor(Math.random() * messages.length)],
                    type: 'text'
                });
                registerTrigger('dinner', 'FOOD_SUGGESTION');
            }

        }, 60000); // Check every 1 minute

        return () => clearInterval(interval);
    }, []);

    // 3. Journey-based triggers - HANYA check saat checkpoints berubah
    useEffect(() => {
        if (!activeJourney) return;

        const unlockedCount = checkpoints.filter(cp => isUnlocked(cp.id)).length;
        const totalCheckpoints = checkpoints.length;
        const progress = (unlockedCount / totalCheckpoints) * 100;

        // Milestone achievements - trigger SEKALI saja per milestone
        if (progress >= 25 && progress < 50 && canTrigger('25percent', 'MILESTONE')) {
            addMessage({
                sender: 'kay',
                text: "Wah! Kamu udah unlock 25% checkpoint! Keren banget! Semangat terus ya! 🎉",
                type: 'text'
            });
            setAvatarState('excited');
            registerTrigger('25percent', 'MILESTONE');
        } else if (progress >= 50 && progress < 75 && canTrigger('50percent', 'MILESTONE')) {
            addMessage({
                sender: 'kay',
                text: "Setengah jalan! 50% checkpoint udah terkumpul! Kamu amazing! Keep going! 🏆",
                type: 'text'
            });
            setAvatarState('excited');
            registerTrigger('50percent', 'MILESTONE');
        } else if (progress >= 75 && progress < 100 && canTrigger('75percent', 'MILESTONE')) {
            addMessage({
                sender: 'kay',
                text: "75% complete! Tinggal dikit lagi full collection! Kamu pro banget! 🌟",
                type: 'text'
            });
            setAvatarState('excited');
            registerTrigger('75percent', 'MILESTONE');
        } else if (progress >= 100 && canTrigger('100percent', 'MILESTONE')) {
            addMessage({
                sender: 'kay',
                text: "AMAZING!! Kamu udah complete SEMUA checkpoint! Congratulations Heritage Master! 👑✨",
                type: 'text'
            });
            setAvatarState('excited');
            registerTrigger('100percent', 'MILESTONE');
        }
    }, [checkpoints, activeJourney]); // Trigger hanya saat checkpoints berubah

    return {
        checkTriggers
    };
};
