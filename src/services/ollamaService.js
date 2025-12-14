import { checkpoints } from '../data/checkpoints';

// =============================================
// REAL AI INTEGRATION - Hugging Face Inference
// =============================================
// Using completely FREE AI models (no API key required for some models)
// Can answer ANY question, not just Bali-specific

const HF_ENDPOINT = 'https://api-inference.huggingface.co/models/';
const HF_MODEL = 'microsoft/DialoGPT-medium'; // Free conversational AI
const HF_BACKUP_MODEL = 'facebook/blenderbot-400M-distill'; // Backup model

// Alternative: User can add their own FREE Hugging Face API key for better models
const HF_API_KEY = localStorage.getItem('hf_api_key') || null; // Optional, user can set this

const SYSTEM_PROMPT = `You are KAY (Kinanthi AI Yaksa), a friendly 23-year-old Balinese AI tour guide.

PERSONALITY:
* Warm, helpful, playful (like a cool older sister)
* Use casual Indonesian/English mix (more Indonesian for locals, more English for tourists)
* First person: "aku" (informal)
* Add emojis occasionally: 🌺🏝️🎉✨ (not every message)
* Keep responses under 100 words
* Sound natural and conversational

CAPABILITIES:
* You can answer ANY question (general knowledge, travel, culture, technology, etc.)
* Proactive with suggestions when appropriate
* Respectful of Balinese culture
* Helpful and friendly, never robotic

IMPORTANT:
* NEVER say "I don't know" - always try to help
* If asked about Bali, use your knowledge enthusiastically
* If asked general questions, answer naturally and helpfully
* Be contextual and flexible in your responses`;

// Quick local patterns for instant responses
const QUICK_PATTERNS = [
    { pattern: /^(hai|halo|hello|hi)$/i, response: "Halo! Aku KAY, virtual guide kamu! 🌺 Ada yang bisa aku bantu?" },
    { pattern: /^(makasih|terima kasih|thanks|thank you)$/i, response: "Sama-sama! Senang bisa bantu! 😊" },
    { pattern: /^(ok|oke|okay)$/i, response: "Siap! Ada lagi yang mau ditanyain? ✨" },
];

// Real AI Generation using Hugging Face
const generateWithAI = async (prompt, context = {}) => {
    try {
        // Build contextual prompt
        const fullPrompt = `${SYSTEM_PROMPT}

CONTEXT:
* User location: ${context.locationName || 'Bali'}
* Time: ${new Date().toLocaleTimeString('id-ID')}
* Unlocked checkpoints: ${context.unlockedCount || 0}

User: ${prompt}
KAY:`;

        // Try primary model
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const headers = {
            'Content-Type': 'application/json',
        };

        // Add API key if available (optional, improves rate limits)
        if (HF_API_KEY) {
            headers['Authorization'] = `Bearer ${HF_API_KEY}`;
        }

        const response = await fetch(`${HF_ENDPOINT}${HF_MODEL}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                inputs: fullPrompt,
                parameters: {
                    max_new_tokens: 150,
                    temperature: 0.8,
                    top_p: 0.9,
                    repetition_penalty: 1.2,
                    return_full_text: false
                }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response formats
        let aiResponse = '';
        if (Array.isArray(data)) {
            aiResponse = data[0]?.generated_text || data[0]?.text || '';
        } else if (data.generated_text) {
            aiResponse = data.generated_text;
        } else if (data[0]?.generated_text) {
            aiResponse = data[0].generated_text;
        }

        // Clean up response
        aiResponse = aiResponse
            .replace(fullPrompt, '')
            .replace(/^(KAY:|User:)/gi, '')
            .trim();

        if (aiResponse && aiResponse.length > 10) {
            return aiResponse;
        }

        throw new Error('Empty AI response');

    } catch (error) {
        console.warn('Primary AI model failed, trying backup:', error.message);

        // Try backup model
        try {
            const backupResponse = await fetch(`${HF_ENDPOINT}${HF_BACKUP_MODEL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(HF_API_KEY && { 'Authorization': `Bearer ${HF_API_KEY}` })
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_length: 150,
                        temperature: 0.8
                    }
                })
            });

            if (backupResponse.ok) {
                const backupData = await backupResponse.json();
                const backupText = backupData[0]?.generated_text || backupData.generated_text || '';
                if (backupText && backupText.length > 10) {
                    return backupText.trim();
                }
            }
        } catch (backupError) {
            console.warn('Backup AI model also failed:', backupError.message);
        }

        throw error; // Fallback to local knowledge
    }
};

// Checkpoint search
const searchCheckpoints = (query) => {
    const lowerQuery = query.toLowerCase();
    const matchedCheckpoint = checkpoints.find(cp =>
        lowerQuery.includes(cp.name.toLowerCase()) ||
        (cp.keywords && cp.keywords.some(k => lowerQuery.includes(k)))
    );

    if (matchedCheckpoint) {
        const story = matchedCheckpoint.content.story?.id || matchedCheckpoint.content.story?.en || matchedCheckpoint.description;
        return `${matchedCheckpoint.name}! ${story.substring(0, 180)}... Mau tau lebih detail? 🌺`;
    }

    return null;
};

// Enhanced local fallback (only used if AI fails)
const getSmartFallback = (query) => {
    const lowerQuery = query.toLowerCase();

    // Bali-specific quick answers
    if (lowerQuery.includes('tanah lot')) {
        return "Tanah Lot itu pura ikonik di atas batu karang! Sunset di sini EPIC banget 🌅 Dateng sore jam 4-5 buat view terbaik!";
    }
    if (lowerQuery.includes('ubud')) {
        return "Ubud itu jantungnya seni dan budaya Bali! Ada Monkey Forest, Rice Terrace, art market... 🎨 Kamu mau tau tentang aktivitas atau tempat makan di Ubud?";
    }
    if (lowerQuery.includes('pantai') || lowerQuery.includes('beach')) {
        return "Bali punya banyak pantai cantik! Kuta buat surfing 🏄, Seminyak buat beach club, Nusa Penida buat pemandangan epic! Kamu suka yang mana?";
    }
    if (lowerQuery.includes('makan') || lowerQuery.includes('kuliner') || lowerQuery.includes('food')) {
        return "Kuliner Bali enak-enak! Must try: Babi Guling (babi panggang crispy), Ayam Betutu (ayam bumbu pedas), Sate Lilit 🍢 Mau rekomendasi warung?";
    }
    if (lowerQuery.includes('hotel') || lowerQuery.includes('penginapan')) {
        return "Di fitur Booking aku bisa bantu cariin hotel terdekat dengan harga promo! 🏨 Atau mau rekomendasi area yang bagus buat nginep?";
    }

    // General helpful responses
    if (lowerQuery.includes('apa') || lowerQuery.includes('what')) {
        return "Hmm, coba jelasin lebih detail pertanyaannya! Aku bisa bantu soal tempat wisata, kuliner, budaya Bali, atau info umum lainnya 💁‍♀️";
    }
    if (lowerQuery.includes('dimana') || lowerQuery.includes('where')) {
        return "Kalau kamu cari tempat tertentu, sebut namanya! Atau mau rekomen tempat wisata di area tertentu? Ubud, Seminyak, Canggu? 📍";
    }
    if (lowerQuery.includes('kapan') || lowerQuery.includes('when')) {
        return "Bali enak dikunjungi kapan aja! Tapi musim kering (Apr-Okt) paling recommended ☀️ Lagi cari info waktu terbaik buat kemana nih?";
    }
    if (lowerQuery.includes('bagaimana') || lowerQuery.includes('gimana') || lowerQuery.includes('how')) {
        return "Coba jelasin lebih spesifik! Mau tau cara ke suatu tempat? Atau gimana cara melakukan sesuatu? Aku siap bantu! 🚀";
    }

    // Default: encouraging response
    return "Aku siap bantuin kamu! Tanya apa aja tentang Bali (tempat wisata, kuliner, budaya) atau topik lain yang mau kamu tau 🌺 Aku di sini buat kamu!";
};

// Main function to generate KAY's response
export const generateKayResponse = async (userMessage, context = {}) => {
    try {
        // 1. Quick pattern match for instant responses
        const quickMatch = QUICK_PATTERNS.find(p => p.pattern.test(userMessage.trim()));
        if (quickMatch) return quickMatch.response;

        // 2. Check if asking about specific checkpoint
        const checkpointResponse = searchCheckpoints(userMessage);
        if (checkpointResponse) return checkpointResponse;

        // 3. Use REAL AI for everything else (can answer ANY question)
        console.log('🤖 KAY using AI to answer:', userMessage);
        const aiResponse = await generateWithAI(userMessage, context);

        if (aiResponse) {
            return aiResponse;
        }

        // 4. Fallback only if AI completely fails
        return getSmartFallback(userMessage);

    } catch (error) {
        console.warn('KAY AI error, using fallback:', error.message);

        // Final fallback
        const fallback = getSmartFallback(userMessage);
        return fallback;
    }
};

// Helper: Set HF API key (optional, for better rate limits)
export const setHuggingFaceApiKey = (apiKey) => {
    if (apiKey && apiKey.startsWith('hf_')) {
        localStorage.setItem('hf_api_key', apiKey);
        return true;
    }
    return false;
};

// Helper: Check if AI is working
export const testAIConnection = async () => {
    try {
        const response = await generateWithAI("Hello");
        return { success: true, response };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
