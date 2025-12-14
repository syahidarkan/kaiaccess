import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {
  ArrowLeft, Share2, MapPin, Play,
  Headphones, Info, Box, History, Maximize2,
  Compass, Scan, X, Pause, ChevronRight, Hand
} from 'lucide-react';
import { useCheckpointStore } from '../../store/useCheckpointStore';

// --- Collection Modal ---
const CollectionModal = ({ items, onClose }) => (
  <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
    <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
      <div className="p-5 border-b flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="font-bold text-xl text-kai-primary">Koleksi Penemuan</h3>
          <p className="text-xs text-gray-500">{items.length} artefak tersimpan</p>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Scan className="w-10 h-10 opacity-30" />
            </div>
            <p className="font-medium">Tas masih kosong.</p>
            <p className="text-sm mt-2 max-w-[200px]">Gunakan AR Scanner untuk menemukan benda bersejarah di sekitar Anda.</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 mb-3">
                <div className="w-14 h-14 bg-kai-primary/10 rounded-xl shrink-0 flex items-center justify-center text-kai-primary">
                  <Box className="w-7 h-7" />
                </div>
                <div>
                  <div className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase inline-block mb-1">
                    {item.type}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 leading-tight">{item.title}</h4>
                </div>
              </div>

              {/* Full Description Section */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative">
                <p className="text-sm text-gray-700 leading-relaxed relative z-10 font-medium">
                  {item.story}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

// --- Sub-components for Features ---

const TimeTravelSlider = ({ oldImage, newImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 rounded-xl overflow-hidden cursor-ew-resize select-none touch-none shadow-lg z-30"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => {
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0].clientX);
        }
      }}
    >
      <img src={newImage} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Modern" />
      <div
        className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={oldImage} className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none" style={{ width: containerRef.current?.offsetWidth || '100%' }} alt="Ancient" />
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-transparent flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="bg-white rounded-full p-2 shadow-xl border-4 border-white/50 bg-clip-padding backdrop-blur-sm transform -translate-x-1/2">
          <History className="w-5 h-5 text-kai-primary" />
        </div>
      </div>

      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 pointer-events-none">1930s (Colonial)</div>
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 pointer-events-none">2024 (Modern)</div>
    </div>
  );
};

// --- AR View Component (Simulated Camera with TensorFlow.js + Contextual AI) ---
const ARView = ({ onClose, checkpoint, onSave, onOpenCollection }) => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [aiResult, setAiResult] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [scannedContent, setScannedContent] = useState(null);
  const [saved, setSaved] = useState(false);

  // Map AI Class names (English) to Localized Context (Indonesian) with "Time Travel" Twist for modern objects
  const AI_CONTENT_MAP = {
    // Heritage/Ancient Objects
    'stupa': { title: 'Struktur Candi', story: 'Bentuk stupa melambangkan perjalanan jiwa menuju pencerahan (Nirwana).' },
    'dome': { title: 'Kubah Utama', story: 'Arsitektur kubah melambangkan cakrawala dan perlindungan semesta.' },
    'monastery': { title: 'Area Peribadatan', story: 'Tempat suci ini aktif digunakan untuk upacara, menghubungkan manusia dengan Sang Pencipta.' },
    'palace': { title: 'Arsitektur Kerajaan', story: 'Gaya bangunan megah ini mencerminkan kejayaan masa feodal Bali.' },
    'stone wall': { title: 'Dinding Pembatas', story: 'Disusun tanpa semen (teknik Gosok), dinding ini memisahkan area suci dari dunia luar.' },
    'rock': { title: 'Batuan Purba', story: 'Formasi batuan alami ini dipercaya memiliki energi magis dan menjadi pondasi pura.' },
    'cliff': { title: 'Tebing Suci', story: 'Posisi di tepi tebing (Ulu) dipilih untuk memuliakan dewa laut dan angin.' },
    'seashore': { title: 'Pesisir Segara', story: 'Pertemuan darat dan laut adalah tempat penyucian (Melukat) energi negatif.' },
    'sculpture': { title: 'Seni Pahat Batu', story: 'Relief ini menceritakan epik Ramayana, mengajarkan moralitas Dharma.' },
    'statue': { title: 'Arca Penjaga', story: 'Patung Dwarapala ini berfungsi menolak bala dan roh jahat dari area suci.' },
    'fountain': { title: 'Pancuran Suci', story: 'Air dari pancuran ini dipercaya dapat menyucikan diri dari energi negatif.' },

    // Modern Objects (Reinterpreted as Time Travel Artifacts) - Handling "monitor", "cup", etc.
    'monitor': { title: 'Cermin Informasi (Monitor)', story: 'Media visual modern. Dahulu, leluhur membaca informasi melalui relief batu dan wayang.' },
    'screen': { title: 'Layar Digital', story: 'Cahaya buatan modern. Leluhur menggunakan pelita dan pantulan air untuk penerangan.' },
    'television': { title: 'Kotak Wayang (TV)', story: 'Panggung cerita modern. Dahulu, hiburan dan ajaran moral disampaikan lewat Wayang Kulit.' },
    'laptop': { title: 'Buku Lontar Digital', story: 'Pustaka ilmu portable. Pengetahuan kuno tersimpan dalam ribuan lembar Lontar di Puri.' },
    'keyboard': { title: 'Papan Tulis Tombol', story: 'Alat catat modern. Sejarah Bali kuno diukir di daun lontar menggunakan Pangrupak (pisau tulis).' },
    'mouse': { title: 'Penunjuk Arah', story: 'Navigasi digital. Pelaut Bugis dan Bali kuno menggunakan rasi bintang untuk navigasi laut.' },
    'cup': { title: 'Wadah Tirta (Cangkir)', story: 'Evolusi dari cawan tanah liat/tempurung kelapa yang digunakan untuk meminum air suci.' },
    'mug': { title: 'Cawan Keramik', story: 'Wadah minum modern. Dalam upacara, wadah air suci (Sangkata) dibuat dari emas atau perak.' },
    'bottle': { title: 'Bumbung Air (Botol)', story: 'Versi plastik dari bumbung bambu atau labu air yang dibawa petapa saat berkelana.' },
    'desk': { title: 'Meja Tulis', story: 'Tempat berkarya. Para Kawi (pujangga) dahulu menulis Kakawin di balai-balai khusus.' },
    'chair': { title: 'Dampar (Kursi)', story: 'Tempat duduk modern. Raja Bali duduk di singgasana tinggi, sementara rakyat bersila di lantai.' },
    'cellphone': { title: 'Kentongan Digital', story: 'Alat komunikasi jarak jauh. Dahulu, warga dikumpulkan menggunakan suara Kulkul (kentongan kayu).' },
    'telephone': { title: 'Alat Sambung Rasa', story: 'Komunikasi suara. Jarak dulu ditempuh dengan utusan berkuda atau pelari cepat.' },
    'watch': { title: 'Penunjuk Wariga (Jam)', story: 'Pengukur waktu mekanis. Leluhur menentukan waktu baik (Dewasa Ayu) berdasarkan posisi matahari dan bintang.' },

    // Expanded Vocabulary for Demo (Beaker, Remote, etc.)
    'beaker': { title: 'Wadah Racikan (Beaker)', story: 'Wadah kaca modern. Tabib Bali kuno (Balian) menggunakan mangkuk keramik untuk meracik loloh (jamu herbal).' },
    'vessel': { title: 'Bejana Suci', story: 'Wadah penyimpanan. Di masa lalu, bejana perunggu digunakan untuk menyimpan air suci kerajaan.' },
    'glass': { title: 'Gelas Kristal', story: 'Wadah bening. Leluhur menganggap kejernihan air sebagai simbol kesucian pikiran.' },
    'remote': { title: 'Tongkat Kendali', story: 'Alat pengendali jarak jauh. Mirip dengan konsep kekuatan batin (Taksu) para resi zaman dulu.' },
    'book': { title: 'Kitab Pengetahuan', story: 'Kumpulan kertas. Ilmu leluhur ditulis di daun lontar dan dijaga ketat di dalam Gedong Penyimpenan.' },
    'paper': { title: 'Lembar Tulis', story: 'Media tulis tipis. Kertas dluwang (kulit kayu) digunakan sebelum kertas modern masuk ke Nusantara.' },
    'pen': { title: 'Pena Tulis', story: 'Alat tulis tinta. Pujangga kuno mengukir sastra menggunakan pengutik besi di atas daun siwalan.' },
    'cellular telephone': { title: 'Pustaka Saku', story: 'Jendela dunia dalam genggaman. Layaknya "Bisma" yang mampu melihat kejadian jauh.' }
  };

  // 1. Load AI Model (MobileNet)
  useEffect(() => {
    const loadAI = async () => {
      try {
        console.log("Loading TensorFlow Model...");
        await tf.ready();
        const net = await mobilenet.load({ version: 2, alpha: 1.0 });
        setModel(net);
        setIsModelLoading(false);
        console.log("Model Loaded");
      } catch (err) {
        console.error("Failed to load AI model", err);
        setIsModelLoading(false);
      }
    };
    loadAI();
  }, []);

  // 2. Camera & Recognition Loop
  useEffect(() => {
    let stream = null;
    let animationFrameId;
    let scanStartTime = 0;

    const startScan = async () => {
      if (!model || showGuide) return; // Wait until guide is closed and model is ready

      try {
        const constraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraActive(true);
            videoRef.current.play().catch(e => console.error("Play error", e));
            scanStartTime = Date.now(); // Start timer
            detectFrame();
          };
        }
      } catch (err) {
        console.error("Camera Error:", err);
        alert("Gagal membuka kamera. Pastikan izin diberikan.");
      }
    };

    const detectFrame = async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended || scanned) return;

      try {
        const predictions = await model.classify(videoRef.current);

        if (predictions && predictions.length > 0) {
          const top = predictions[0];
          const elapsed = Date.now() - scanStartTime;

          // Debug logs for user to verify AI is working
          console.log(`AI Seeing: ${top.className} (${Math.round(top.probability * 100)}%)`);

          // Only accept result if > 3s elapsed AND > 5% confidence (lowered from 20% to catch MobileNet's lower confidence on specific heritage items)
          if (elapsed > 3000 && top.probability > 0.05) {
            const detectedClass = top.className.toLowerCase();

            // Fuzzy Match Logic
            let matchedContent = null;
            for (const key in AI_CONTENT_MAP) {
              if (detectedClass.includes(key)) {
                matchedContent = AI_CONTENT_MAP[key];
                break;
              }
            }

            // Fallback Content
            if (!matchedContent) {
              const detectedName = top.className.split(',')[0];
              matchedContent = {
                title: `Artefak Misterius: ${detectedName}`,
                story: `Panduan AR mengidentifikasi benda ini sebagai "${detectedName}". Dalam konteks sejarah, setiap benda memiliki fungsi yang unik. Bandingkan bentuknya dengan peralatan tradisional Bali untuk menemukan kesamaan fungsinya.`
              };
            }

            setAiResult(top.className.split(',')[0]); // Simple name
            setScannedContent(matchedContent);
            setScanned(true);
            return;
          }
        }
      } catch (e) {
        // Frame processing error
      }

      animationFrameId = requestAnimationFrame(detectFrame);
    };

    startScan();

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [model, showGuide, scanned]);


  const handleSave = () => {
    if (scanned && scannedContent && !saved) {
      onSave({
        title: scannedContent.title,
        story: scannedContent.story,
        type: aiResult
      });
      setSaved(true);
      // Reset after 2s to allow scanning again? Or keep it scanned.
    }
  };

  const resetScan = () => {
    setScanned(false);
    setSaved(false);
    setScannedContent(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-300 flex flex-col font-sans">

      {/* 1. Camera Feed / Fallback */}
      <div className="absolute inset-0">
        <video ref={videoRef} playsInline muted className={`w-full h-full object-cover transition-opacity duration-500 ${cameraActive ? 'opacity-100' : 'opacity-0'}`} />
        {!cameraActive && (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            {!showGuide && (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-white/50 text-sm">
                  {isModelLoading ? 'Memuat AI Model...' : 'Membuka Kamera...'}
                </p>
              </div>
            )}
            <img src={checkpoint?.media?.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" alt="Background" />
          </div>
        )}
      </div>

      {/* 2. Guide Overlay (Onboarding) */}
      {showGuide && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-kai-primary/20 rounded-full flex items-center justify-center mb-6">
            <Scan className="w-10 h-10 text-kai-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AR History Scanner</h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xs mx-auto">
            Arahkan kamera ke objek.
            <br />
            <span className="text-kai-orange font-bold">TensorFlow AI</span> akan menganalisis bentuk visual dan menampilkan cerita sejarahnya.
          </p>

          {isModelLoading ? (
            <div className="bg-white/10 px-6 py-3 rounded-full flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-sm">Menyiapkan Mesin AI...</span>
            </div>
          ) : (
            <button
              onClick={() => setShowGuide(false)}
              className="bg-kai-primary hover:bg-kai-primary/90 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              Mulai Pindai
            </button>
          )}
        </div>
      )}

      {/* 3. Main Scanning UI */}
      {!showGuide && (
        <div className="relative z-10 flex flex-col justify-between h-full p-6 safe-area-top safe-area-bottom">

          {/* Top Bar */}
          <div className="flex justify-between items-start">
            <button onClick={onClose} className="p-3 bg-black/40 rounded-full text-white backdrop-blur-xl border border-white/10 active:scale-95 transition-transform">
              <X className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              <div className="bg-black/60 px-4 py-2 rounded-full backdrop-blur-xl border border-white/20">
                <span className="text-white text-xs font-bold flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${scanned ? 'bg-green-400' : 'bg-kai-orange/80'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${scanned ? 'bg-green-500' : 'bg-kai-orange'}`}></span>
                  </span>
                  {scanned ? 'Objek Teridentifikasi' : 'Menganalisis Visual...'}
                </span>
              </div>

              {/* Collection Button */}
              <button onClick={onOpenCollection} className="p-2 bg-black/40 rounded-full text-white backdrop-blur-xl border border-white/20 relative">
                <Box className="w-5 h-5" />
              </button>

              <button onClick={() => setShowGuide(true)} className="p-2 bg-black/40 rounded-full text-white backdrop-blur-xl border border-white/20">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Scanner Frame */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className={`relative w-72 h-72 border-[3px] rounded-3xl flex items-center justify-center transition-all duration-500 ${scanned ? 'border-green-400 shadow-[0_0_50px_rgba(74,222,128,0.3)] bg-green-500/10' : 'border-white/40'}`}>
              {/* Corner Markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[4px] border-l-[4px] border-white rounded-tl-xl -mt-1 -ml-1"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[4px] border-r-[4px] border-white rounded-tr-xl -mt-1 -mr-1"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[4px] border-l-[4px] border-white rounded-bl-xl -mb-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[4px] border-r-[4px] border-white rounded-br-xl -mb-1 -mr-1"></div>

              {/* Scanning Laser */}
              {!scanned && (
                <div className="absolute left-2 right-2 h-0.5 bg-kai-orange shadow-[0_0_15px_orange] animate-[scan_2s_ease-in-out_infinite]" style={{ top: '50%' }}></div>
              )}

              {/* Success Card */}
              {scanned && scannedContent && (
                <div className="bg-white/95 p-5 rounded-2xl shadow-2xl w-[280px] animate-bounce-slow text-center backdrop-blur-sm z-20">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 shadow-md">
                    <Scan className="w-6 h-6" />
                  </div>

                  {/* AI Detection Badge */}
                  <div className="bg-gray-100 rounded-full px-3 py-1 mb-2 inline-flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{aiResult}</span>
                  </div>

                  {/* DYNAMIC TITLE */}
                  <h3 className="text-xl font-bold text-kai-primary leading-tight mb-2">
                    {scannedContent.title}
                  </h3>

                  {/* DYNAMIC STORY */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-4">
                    {scannedContent.story}
                  </p>

                  <div className="h-1 w-12 bg-gray-200 rounded-full mx-auto"></div>
                </div>
              )}
            </div>

            <p className="text-white font-medium mt-10 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 text-center max-w-xs shadow-lg">
              {scanned ? (saved ? 'Berhasil disimpan ke Tas Koleksi!' : 'Ketuk tombol hijau untuk menyimpan') : 'Arahkan ke objek...'}
            </p>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="flex gap-4">
              {/* Reset Button */}
              {scanned && (
                <button onClick={resetScan} className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                  <X className="w-6 h-6" />
                </button>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`w-20 h-20 rounded-full border-[6px] flex items-center justify-center transition-all duration-300 shadow-2xl ${scanned ? (saved ? 'border-gray-400 bg-gray-500 cursor-default' : 'border-green-400 scale-110 bg-white/10') : 'border-white/50 bg-transparent'}`}
                disabled={!scanned || saved}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${scanned ? (saved ? 'bg-gray-400' : 'bg-green-400 scale-100') : 'bg-white scale-90 opacity-80'}`}>
                  {saved && <Box className="w-8 h-8 text-white" />}
                </div>
              </button>
            </div>
            <span className="text-white text-xs font-bold uppercase tracking-widest text-shadow">
              {saved ? 'Tersimpan' : 'Simpan'}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
            0% { top: 10%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 90%; opacity: 0; }
        }
        `}</style>
    </div>
  );
};

// --- VR 360 View Component (Immersive & Gyro) ---
const VR360View = ({ image }) => {
  const [bgPosition, setBgPosition] = useState(0);
  const [bgPositionY, setBgPositionY] = useState(50); // Vertical center
  const [isDragging, setIsDragging] = useState(false);
  const [useGyro, setUseGyro] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false); // Fullscreen Toggle
  const startX = useRef(0);
  const startY = useRef(0);
  const currentBgPos = useRef(0);
  const currentBgPosY = useRef(50);

  // Reliable fallback image (Scenic Seamless 360 Panorama)
  // Using a verified equirectangular projection image for true 360 seamless scrolling
  const FALLBACK_IMAGE = "https://raw.githubusercontent.com/aframevr/aframe/master/examples/boilerplate/panorama/puydesancy.jpg";

  // Load image securely to bypass CORB/CORS issues if possible, or gracefully fallback
  useEffect(() => {
    let active = true;
    const targetImage = (image && image.length > 5) ? image : FALLBACK_IMAGE;

    const loadImage = async () => {
      setLoading(true);
      try {
        // Try simple Image object loading first to check availability
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = targetImage;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        if (active) {
          setImageUrl(targetImage);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Primary image failed, trying fallback...", err);
        // If primary fails, try fallback
        if (targetImage !== FALLBACK_IMAGE && active) {
          setImageUrl(FALLBACK_IMAGE);
          setLoading(false);
        }
      }
    };

    loadImage();
    return () => { active = false; };
  }, [image]);


  // Gyroscope Logic (Compass Heading / Alpha for X, Beta for Y)
  useEffect(() => {
    const handleOrientation = (event) => {
      if (!useGyro) return;

      // X Axis: Alpha/Compass
      let heading = 0;
      if (event.webkitCompassHeading) {
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }
      const pixelsPerDegree = 15;
      setBgPosition(heading * pixelsPerDegree);

      // Y Axis: Beta (Tilt front/back) 
      // Beta ranges from -180 to 180. usually -90 (up) to 90 (down) for holding phone.
      // We want -90 -> 0% (top), 90 -> 100% (bottom)?
      // Or 0 (horizon) -> 50%.
      if (event.beta !== null) {
        // Map beta -45 (look up) to 45 (look down) to 0-100%
        // Clamp beta between -45 and 45 for comfort
        const clampedBeta = Math.max(-45, Math.min(45, event.beta));
        // Normalize to 0-100
        // -45 -> 0, 45 -> 100 => (beta + 45) * (100/90)
        const yPerc = (clampedBeta + 45) * (100 / 90);
        setBgPositionY(yPerc);
      }
    };

    if (useGyro) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [useGyro]);

  // Touch/Mouse Drag Logic (Free Look)
  const handleStart = (clientX, clientY) => {
    if (useGyro) return;
    setIsDragging(true);
    startX.current = clientX;
    startY.current = clientY;
    currentBgPos.current = bgPosition;
    currentBgPosY.current = bgPositionY;
  };

  const handleMove = (clientX, clientY) => {
    if (useGyro) return;
    if (!isDragging) return;

    // Horizontal
    const deltaX = clientX - startX.current;
    setBgPosition(currentBgPos.current - deltaX);

    // Vertical
    // Drag down (positive delta) -> View moves up (background moves up, lower %)
    // Seeing top means 0% background-position-y.
    // So positive delta should DECREASE percentage.
    const deltaY = clientY - startY.current;
    // Sensitivity: 0.3% per pixel
    const newY = currentBgPosY.current - (deltaY * 0.3);
    setBgPositionY(Math.max(0, Math.min(100, newY)));
  };

  const toggleGyro = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            setUseGyro(!useGyro);
          } else {
            alert("Izin gyroscope ditolak. Gunakan sentuhan untuk menggeser.");
          }
        })
        .catch(console.error);
    } else {
      setUseGyro(!useGyro);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 w-screen h-screen z-[100] rounded-none' : 'relative w-full h-[500px] rounded-3xl'} overflow-hidden shadow-2xl group border-4 border-white bg-gray-900 flex items-center justify-center transition-all duration-500`}>

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gray-900 text-white">
          <div className="w-10 h-10 border-4 border-kai-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium animate-pulse">Loading VR Scene...</p>
        </div>
      )}

      {/* Viewport */}
      {!loading && imageUrl && (
        <div
          className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none ${useGyro ? 'transition-all duration-300 ease-out' : ''}`}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: isFullScreen ? 'auto 300%' : 'auto 250%', // Even more Zoom in full screen for immersion
            backgroundPosition: `${-bgPosition}px ${bgPositionY}%`,
            backgroundRepeat: 'repeat-x'
          }}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Overlay Grid for "Tech" feel */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
        {/* Toggle Fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="p-3 rounded-full backdrop-blur-md border shadow-lg transition-all bg-white/20 text-white border-white/30 hover:bg-white/30"
          title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullScreen ? <X className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
        </button>

        {/* Toggle Gyro */}
        <button
          onClick={toggleGyro}
          className={`p-3 rounded-full backdrop-blur-md border shadow-lg transition-all ${useGyro ? 'bg-kai-primary text-white border-transparent animate-pulse' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}
          title="Toggle Gyroscope"
        >
          <Compass className={`w-6 h-6 ${useGyro ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className={`absolute bottom-6 left-6 right-6 pointer-events-none transition-all duration-500 ${isFullScreen ? 'scale-110 mb-8' : ''}`}>
        <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${useGyro ? 'bg-green-500' : 'bg-white/20'}`}>
            {useGyro ? <Scan className="w-6 h-6 text-white animate-ping" /> : <Hand className="w-6 h-6 text-white" />}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">360° VR Experience</h3>
            <p className="text-white/70 text-xs">
              {useGyro ? 'Putar badan Anda untuk melihat sekeliling' : 'Geser layar untuk melihat sekeliling'}
            </p>
          </div>
        </div>
      </div>

      {/* Center Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/80"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/80"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white/80"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white/80"></div>
        <div className="absolute inset-0 border border-white/50 rounded-full"></div>
      </div>
    </div>
  );
};


// --- Live Train Preview Component ---
const LiveTrainPreview = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg shadow-blue-500/5 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-kai-primary" /> Posisi Kereta Real-time
        </h4>
        <div className="flex items-center gap-1.5 text-[10px] bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-bold border border-green-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          LIVE TRACKING
        </div>
      </div>

      {/* Map simulation */}
      <div className="relative h-40 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
        {/* Abstract Map Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M -10 80 Q 80 40 160 80 T 350 80" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          <path d="M -10 80 Q 80 40 160 80 T 350 80" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round"
            className="animate-[dash_6s_linear_infinite]" strokeDasharray="10 10" />
        </svg>

        {/* Train Icon Animation - FORCE STYLE */}
        <div
          className="absolute z-10"
          style={{
            animation: 'moveTrain 8s linear infinite',
            transform: 'translate(-50%, -50%)',
            // Fallback position
            left: '50%',
            top: '80px'
          }}
        >
          <div className="relative">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-black">
              Argo Wilis (85 km/h)
            </div>
            <div className="w-8 h-8 bg-white border-4 border-kai-primary rounded-full shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-kai-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stations */}
        <div className="absolute top-[80px] left-[20%] w-3 h-3 bg-slate-300 rounded-full border-2 border-white -translate-y-1/2" />
        <div className="absolute top-[80px] left-[80%] w-3 h-3 bg-slate-300 rounded-full border-2 border-white -translate-y-1/2" />
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Kereta sedang bergerak menuju checkpoint berikutnya.
      </p>

      <style>{`
        @keyframes moveTrain {
           0% { left: -10%; top: 80px; }
           25% { left: 20%; top: 70px; } 
           50% { left: 50%; top: 80px; }
           75% { left: 80%; top: 70px; }
           100% { left: 110%; top: 80px; }
        }
      `}</style>
    </div>
  );
};

// --- AR Action Button Component ---
const ARActionButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-gradient-to-r from-kai-primary to-[#2a2f85] text-white p-[2px] rounded-2xl shadow-xl shadow-blue-600/20 group active:scale-95 transition-transform mt-6"
  >
    <div className="bg-kai-primary rounded-xl px-5 py-4 flex items-center justify-between h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <Scan className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div className="text-left">
          <span className="block text-[10px] uppercase font-extrabold text-blue-200 tracking-widest mb-0.5">Experience History</span>
          <span className="block font-bold text-xl leading-none">Mulai AR Scanner</span>
        </div>
      </div>
      <div className="bg-white/10 p-2 rounded-full relative z-10">
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  </button>
);


// --- Main Component ---

export default function CheckpointDetail() {
  const { checkpointId } = useParams();
  const navigate = useNavigate();
  const { getCheckpointById } = useCheckpointStore();
  const [activeTab, setActiveTab] = useState('Story');
  const [showAR, setShowAR] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('id'); // Default Indonesian

  // Collection Logic
  const [collectedItems, setCollectedItems] = useState([]);
  const [showCollection, setShowCollection] = useState(false);

  // Fallback ID usage
  const idToUse = checkpointId || 'CP001';
  // Use CP001 as extreme fallback if store empty or ID not found
  const checkpoint = getCheckpointById(idToUse) || {
    name: "Loading or Not Found",
    region: "Bali",
    // Ensure story object exists for fallback
    content: { story: { id: "Memuat data...", en: "Loading..." }, facts: [] },
    media: { coverImage: "", gallery: [] },
    category: "temple"
  };

  const handleSaveToCollection = (item) => {
    const exists = collectedItems.find(i => i.title === item.title);
    if (!exists) {
      setCollectedItems(prev => [...prev, item]);
    }
  };

  if (!checkpoint) return <div className="p-10 text-center">Checkpoint not found</div>;
  return (
    <div className="min-h-screen bg-white pb-10 font-sans">
      {showAR && (
        <ARView
          onClose={() => setShowAR(false)}
          checkpoint={checkpoint}
          onSave={handleSaveToCollection}
          onOpenCollection={() => setShowCollection(true)}
        />
      )}

      {showCollection && (
        <CollectionModal items={collectedItems} onClose={() => setShowCollection(false)} />
      )}

      {/* Hero Section */}
      <div className="relative h-[55vh]">
        <img
          src={checkpoint.media?.coverImage}
          className="w-full h-full object-cover"
          alt={checkpoint.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 p-4 safe-area-top flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Title info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white pb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-kai-orange/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {checkpoint.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3" /> {checkpoint.region}
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-2 leading-none drop-shadow-lg">
            {checkpoint.name}
          </h1>
        </div>
      </div>

      {/* Main Content Sheet */}
      <div className="relative -mt-8 bg-white rounded-t-[2.5rem] px-6 pt-10 z-20 min-h-[50vh] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        {/* Center Pull Bar */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-8 opacity-50" />

        {/* Audio Player */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-5 flex items-center gap-5 mb-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <Headphones className="w-24 h-24 text-kai-primary" />
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-kai-primary flex items-center justify-center text-white shadow-xl shadow-blue-500/20 shrink-0 hover:scale-105 active:scale-95 transition-all z-10"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
          </button>
          <div className="flex-1 z-10">
            <p className="text-[10px] font-bold text-kai-primary uppercase tracking-widest mb-1">Audio Guide</p>
            <h4 className="font-bold text-kai-grey-900 leading-tight text-lg">The Legend Story</h4>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-kai-primary h-full rounded-full transition-all duration-[2000ms] ease-linear ${isPlaying ? 'w-2/3' : 'w-0'}`}></div>
              </div>
              <span className="text-xs font-bold text-gray-400 font-mono">03:45</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 no-scrollbar">
          {['Story', 'Features', 'Gallery', 'Time Travel'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab
                ? 'bg-kai-primary text-white border-kai-primary shadow-lg shadow-blue-500/25'
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="pb-10 min-h-[300px]">
          {activeTab === 'Story' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

              {/* Language Toggle Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 font-display">
                  {lang === 'id' ? 'Cerita Sejarah' : 'Historical Story'}
                </h2>
                <div className="flex bg-gray-100 p-1 rounded-full">
                  <button
                    onClick={() => setLang('id')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'id' ? 'bg-white shadow-sm text-kai-primary' : 'text-gray-400'}`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white shadow-sm text-kai-primary' : 'text-gray-400'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Story Content */}
              <div>
                <p className="text-gray-600 leading-relaxed text-lg font-serif whitespace-pre-line text-justify">
                  {/* Drop cap for first letter */}
                  <span className="text-5xl font-bold text-kai-primary float-left mr-3 mt-[-6px] font-display">
                    {(checkpoint.content.story[lang] || "").charAt(0)}
                  </span>
                  {(checkpoint.content.story[lang] || "").slice(1)}
                </p>
              </div>

              {/* Facts */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex gap-4">
                  <div className="bg-orange-100 p-2.5 rounded-xl h-fit">
                    <Info className="w-5 h-5 text-kai-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-kai-orange mb-1">{lang === 'id' ? 'Tahukah Anda?' : 'Did You Know?'}</h4>
                    <ul className="list-disc list-outside pl-4 text-sm text-gray-700 space-y-1">
                      <li>{checkpoint.content.facts?.[0] || 'Historical site since 16th century'}</li>
                      <li>{checkpoint.content.facts?.[1] || 'Sacred place for locals'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Live Train Preview */}
              <div className="pt-4">
                <LiveTrainPreview />
              </div>

              {/* AR Action Button - Static Position */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 mb-2">Mulai Misi AR</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Arahkan kamera ke objek sekitar untuk mengungkap sejarah tersembunyi.
                </p>
                <ARActionButton onClick={() => setShowAR(true)} />
              </div>
            </div>
          )}

          {activeTab === 'Gallery' && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in zoom-in duration-300">
              {checkpoint.media.gallery?.map((img, idx) => (
                <div key={idx} className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Features' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <VR360View image={checkpoint.media.panorama || checkpoint.media.coverImage} />

              {/* AR Button Moved Here */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 mb-2">Augmented Reality</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Gunakan kamera Anda untuk memindai objek sekitar dan temukan cerita sejarah tersembunyi.
                </p>
                <ARActionButton onClick={() => setShowAR(true)} />
              </div>
            </div>
          )}

          {activeTab === 'Time Travel' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <History className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-amber-800">Time Machine</h4>
                </div>
                <p className="text-sm text-amber-900/80 leading-relaxed">
                  Drag the slider below to witness how time has shaped this location over the last century.
                </p>
              </div>

              <TimeTravelSlider
                oldImage={checkpoint.media.oldImage || "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80&grayscale"}
                newImage={checkpoint.media.coverImage}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
