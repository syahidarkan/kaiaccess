import { useEffect, useState, useRef, useMemo } from 'react'; // Fixed imports
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import {
  ArrowLeft, Map as MapIcon, Navigation, Layers, Award,
  List, Play, Grid, Camera, Compass, BarChart3, ChevronRight,
  TrendingUp, TrainFront
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useBookingStore } from '../../store/useBookingStore';
import { useJourneyStore } from '../../store/useJourneyStore';
import { useCheckpointStore } from '../../store/useCheckpointStore';
import { useUserStore } from '../../store/useUserStore';
import { route } from '../../data/route';
import { calculateDistance, formatDistance } from '../../utils/distance';
import { checkJourneyStatus } from '../../utils/dateHelpers';
import { startRouteSimulation } from '../../utils/routeSimulator';
import { createDemoJourney } from '../../utils/demoMode';
import Header from '../../components/layout/Header';
import KayFab from '../../components/kay/KayFab';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers
const createCustomIcon = (color, unlocked = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-8 h-8 rounded-full flex items-center justify-center ${unlocked ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white shadow-lg">
      ${unlocked ? '✓' : '🔒'}
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const createStationIcon = (stationType) => {
  const isAirport = stationType === 'airport';
  return L.divIcon({
    className: 'station-marker',
    html: `<div class="relative">
      <div class="w-10 h-10 ${isAirport ? 'bg-kai-orange' : 'bg-kai-primary'} rounded-xl flex items-center justify-center border-3 border-white shadow-xl transform hover:scale-110 transition-transform">
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          ${isAirport
            ? '<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>'
            : '<path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.51 0 6 .48 6 2v3H6V6c0-1.52 2.49-2 6-2zM6 13h5v3H7.5c-.83 0-1.5-.67-1.5-1.5V13zm7 3v-3h5v1.5c0 .83-.67 1.5-1.5 1.5H13z"/>'
          }
        </svg>
      </div>
      <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-md whitespace-nowrap border border-gray-200">
        <span class="text-[9px] font-bold ${isAirport ? 'text-kai-orange' : 'text-kai-primary'}">${isAirport ? 'AIRPORT' : 'STATION'}</span>
      </div>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg pulse-ring"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;

    let lat, lng;
    if (Array.isArray(position) && position.length === 2) {
      [lat, lng] = position;
    } else if (position && typeof position.lat === 'number' && typeof position.lng === 'number') {
      lat = position.lat;
      lng = position.lng;
    }

    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [position, map]);
  return null;
}

// --- Sub-components ---
const CheckpointAlert = ({ checkpoint, onClose }) => {
  if (!checkpoint) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-50 slide-in-from-bottom-10 duration-500 text-center relative overflow-hidden group">

        {/* Animated Background with Sparkles */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-kai-primary to-transparent opacity-20 -translate-y-10 group-hover:translate-y-0 transition-transform duration-1000"></div>

        {/* Confetti animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-kai-orange to-yellow-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
          }
          .animate-confetti { animation: confetti 3s ease-out forwards; }
        `}</style>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-orange-100 relative">
            {/* Pulsing rings animation */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-kai-orange animate-spin-slow"></div>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30"></div>
            <img src={checkpoint.media.coverImage} className="w-full h-full rounded-full object-cover" alt="Thumb" />
            <div className="absolute -bottom-2 bg-kai-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce">REACHED ✓</div>
          </div>

          {/* Achievement badge with pulse */}
          <div className="mb-2 flex justify-center">
            <Award className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>

          <h3 className="text-kai-primary font-bold text-xs tracking-widest uppercase mb-1 animate-in slide-in-from-left">Checkpoint Unlocked!</h3>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2 leading-none animate-in slide-in-from-right">{checkpoint.name}</h2>
          <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
            <MapIcon className="w-3 h-3" /> {checkpoint.region}
          </p>

          <div className="bg-orange-50 p-4 rounded-xl mb-6 text-left border border-orange-100">
            <p className="text-xs text-gray-600 line-clamp-3 italic">
              "{checkpoint.content.story.en ? checkpoint.content.story.en.substring(0, 100) : 'Welcome to this amazing heritage site...'}..."
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-kai-primary to-kai-purple text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Lanjutkan Perjalanan
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({
  progress,
  unlockedCount,
  checkpoints,
  nextCheckpoint,
  currentLocation,
  isDemoMode,
  setViewMode,
  setMapCenter,
  navigate,
  unlockCheckpoint,
  isUnlocked,
  routePolyline
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-20 relative">
      {/* Header Spacer for Fixed Header */}
      <div className="bg-gradient-to-br from-kai-primary to-kai-purple pb-32 pt-32 px-6 rounded-b-[2.5rem] relative z-0 shadow-xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

        <div className="flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-3xl font-bold font-display leading-tight text-white mb-1 drop-shadow-md">Misi Perjalanan</h2>
            <p className="text-blue-100/80 text-sm font-medium">Kereta Eksplorasi Bali</p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-md px-4 py-3   rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-end gap-1 justify-end">
              <span className="block text-3xl font-bold text-white leading-none">{progress}</span>
              <span className="text-sm text-white/80 font-bold mb-1">%</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Completed</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-24 relative z-10 space-y-6">

        {/* Live Map Preview Card */}
        <div className="bg-white rounded-3xl p-4 shadow-xl shadow-blue-900/10 border border-white/50">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-kai-primary" />
              Live Tracking
            </h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Train Moving
            </span>
          </div>
          <div className="h-48 rounded-2xl overflow-hidden relative border border-gray-100 group shadow-inner bg-slate-50">
            {/* Abstract animated map */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://img.freepik.com/free-vector/city-map-background-blue-tone_1017-19946.jpg')] bg-cover bg-center grayscale" />

            {/* Animation Keyframes */}
            <style>{`
                @keyframes moveDash { to { stroke-dashoffset: -20; } }
                @keyframes moveMarker { 
                  0% { left: 10%; top: 70%; }
                  25% { left: 30%; top: 50%; }
                  50% { left: 50%; top: 60%; }
                  75% { left: 70%; top: 40%; }
                  100% { left: 90%; top: 30%; }
                }
             `}</style>

            {/* Route Line - SVG needs to match the keyframe path somewhat visually */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Visual path approximation */}
              <path d="M 0 140 C 100 100, 200 120, 350 60" stroke="#cbd5e1" strokeWidth="4" fill="none" />
              <path d="M 0 140 C 100 100, 200 120, 350 60" stroke="#2563EB" strokeWidth="4" fill="none" strokeDasharray="8 8"
                style={{ animation: 'moveDash 1s linear infinite' }} />
            </svg>

            {/* Moving Train */}
            <div className="absolute z-10" style={{ animation: 'moveMarker 12s linear infinite', left: '10%', top: '70%' }}>
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-white border-[3px] border-kai-primary rounded-full shadow-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-2 border-kai-primary animate-ping opacity-20"></div>
                  <TrainFront className="w-5 h-5 text-kai-primary" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 text-[10px] font-bold bg-kai-primary text-white px-2 py-1 rounded shadow-md mt-1 whitespace-nowrap flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Argo Wilis
                </div>
              </div>
            </div>

            {/* Overlay Interactive Button */}
            <button
              onClick={() => setViewMode('MAP')}
              className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center group"
            >
              <span className="bg-white px-5 py-2.5 rounded-full shadow-xl font-bold text-sm text-kai-primary transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all flex items-center gap-2">
                <MapIcon className="w-4 h-4" />
                Buka Peta Full Screen
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:border-kai-primary/30 transition-colors">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Distance</span>
            <span className="font-bold text-kai-grey-900 text-lg">12<span className="text-xs font-normal text-gray-400">km</span></span>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:border-kai-primary/30 transition-colors">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Unlock</span>
            <span className="font-bold text-kai-grey-900 text-lg">{unlockedCount}<span className="text-xs font-normal text-gray-400">/{checkpoints.length}</span></span>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:border-kai-primary/30 transition-colors">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">ETA</span>
            <span className="font-bold text-kai-grey-900 text-lg">2<span className="text-xs font-normal text-gray-400">h</span></span>
          </div>
        </div>

        {/* Next Objective Card */}
        {nextCheckpoint && (
          <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-5 shadow-card border border-orange-100 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute right-0 top-0 opacity-10">
              <MapIcon className="w-32 h-32 text-orange-500 transform rotate-12 translate-x-8 -translate-y-8" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Next Stop</span>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-kai-grey-900 leading-tight pr-8">{nextCheckpoint.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapIcon className="w-3 h-3" /> {nextCheckpoint.region}</p>

              {currentLocation && (
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-orange-100/50">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 font-medium">Distance to target</span>
                    <span className="font-bold text-kai-grey-900">{formatDistance(calculateDistance(currentLocation, nextCheckpoint.coordinates))}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {isDemoMode() && (
                  <button
                    onClick={() => unlockCheckpoint(nextCheckpoint.id)}
                    className="w-full bg-kai-orange text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Simulate Arrival (Demo)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timeline List with Connecting Line */}
        <div className="bg-white rounded-3xl shadow-card p-6 pb-8 border border-gray-100">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <List className="w-5 h-5 text-gray-400" />
            Checkpoint Route
          </h3>
          <div className="space-y-0 relative">
            {/* Continuous Line (Gray) */}
            <div className="absolute left-[1.65rem] top-4 bottom-4 w-0.5 bg-gray-100" />

            {/* Progress Line (Colored) - Simplified hardcoded height for demo, dynamically requires complex calculation */}
            <div className="absolute left-[1.65rem] top-4 w-0.5 bg-green-500 transition-all duration-1000" style={{ height: `${(unlockedCount / checkpoints.length) * 100}%` }} />

            {checkpoints.map((cp, idx) => {
              const unlocked = isUnlocked(cp.id);
              const isNext = nextCheckpoint && nextCheckpoint.id === cp.id;

              return (
                <div key={cp.id} className="relative pl-14 py-3 group">
                  {/* Node Connector */}
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 transition-all duration-500 ${unlocked ? 'bg-green-500 scale-100' : isNext ? 'bg-orange-500 scale-110' : 'bg-gray-200'}`}>
                    {unlocked && <span className="text-white text-[10px] font-bold">✓</span>}
                    {isNext && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => unlocked ? navigate(`/bali-heritage/checkpoint/${cp.id}`) : null}
                    className={`transition-all rounded-xl p-3 border ${unlocked ? 'border-green-100 bg-green-50/30 cursor-pointer hover:bg-green-50' : isNext ? 'border-orange-200 bg-orange-50 shadow-md transform scale-[1.02]' : 'border-transparent opacity-60'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className={`font-bold text-sm ${unlocked ? 'text-green-900' : isNext ? 'text-orange-900' : 'text-gray-500'}`}>{cp.name}</h4>
                        <p className="text-xs text-gray-500">{cp.region}</p>
                      </div>
                      {unlocked && <ChevronRight className="w-4 h-4 text-green-300" />}
                      {isNext && <span className="text-[10px] font-bold text-orange-500 bg-white px-2 py-0.5 rounded-full shadow-sm">NEXT</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Journey() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBookingById } = useBookingStore();
  const { updateLocation, activeJourney, startJourney } = useJourneyStore();
  const { checkpoints, unlockCheckpoint, isUnlocked } = useCheckpointStore();
  const { isDemoMode, awardBadge } = useUserStore();

  const [booking, setBooking] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [viewMode, setViewMode] = useState('DASHBOARD'); // DASHBOARD | MAP
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [mapCenter, setMapCenter] = useState([-8.4095, 115.1889]);
  const [demoJourney, setDemoJourney] = useState(null);
  const [showKayWelcome, setShowKayWelcome] = useState(false);

  // Derived state definition
  const unlockedCount = useMemo(() => checkpoints.filter(cp => isUnlocked(cp.id)).length, [checkpoints, isUnlocked]);
  const progress = useMemo(() => Math.round((unlockedCount / checkpoints.length) * 100), [unlockedCount, checkpoints.length]);
  const nextCheckpoint = useMemo(() => checkpoints.find(cp => !isUnlocked(cp.id)), [checkpoints, isUnlocked]);

  // Now create the Ref which depends on unlockedCount
  const prevUnlockedCountRef = useRef(unlockedCount);

  // Then other state
  const [showCheckpointAlert, setShowCheckpointAlert] = useState(false);
  const [justUnlockedCheckpoint, setJustUnlockedCheckpoint] = useState(null);

  useEffect(() => {
    const bookingData = getBookingById(bookingId);
    if (!bookingData) { navigate('/bali-heritage'); return; }
    setBooking(bookingData);

    if (!isDemoMode()) {
      const status = checkJourneyStatus(bookingData.date, bookingData.time);
      if (!status.isActive) {
        console.warn(`Journey inactive: ${status.message}`);
      }
    }

    if (!activeJourney || activeJourney.bookingId !== bookingId) {
      startJourney(bookingId);
      setShowKayWelcome(true); // Show KAY welcome notification when journey starts
    }

    if (isDemoMode()) {
      const demo = createDemoJourney((loc) => {
        setCurrentLocation(loc);
        updateLocation(loc);
        setMapCenter([loc.lat, loc.lng]);
        checkNearbyCheckpoints(loc);
      }, 0.5); // Speed 0.5x (diperlambat drastis dari 5x)
      demo.start();
      setDemoJourney(demo);
      return () => demo.stop();
    } else {
      // Use simulated GPS tracking along the route
      const simulator = startRouteSimulation((pos) => {
        setCurrentLocation(pos);
        setMapCenter([pos.lat, pos.lng]);
        updateLocation(pos);
        checkNearbyCheckpoints(pos);
      });

      // Set initial position
      const initialPos = { lat: -8.7467, lng: 115.1670 }; // Airport start
      setCurrentLocation(initialPos);
      setMapCenter([initialPos.lat, initialPos.lng]);

      return () => simulator.stop();
    }
  }, [bookingId]);

  const checkNearbyCheckpoints = (userLocation) => {
    checkpoints.forEach((checkpoint) => {
      if (!isUnlocked(checkpoint.id)) {
        const distance = calculateDistance(userLocation, checkpoint.coordinates);
        if (distance <= checkpoint.unlockRadius) {
          unlockCheckpoint(checkpoint.id);
          awardBadge('BADGE_FIRST');
        }
      }
    });
  };

  useEffect(() => {
    if (unlockedCount > prevUnlockedCountRef.current) {
      if (currentLocation) {
        const newlyUnlocked = checkpoints.find(cp => isUnlocked(cp.id) && calculateDistance(currentLocation, cp.coordinates) < cp.unlockRadius * 1.5);
        if (newlyUnlocked) {
          setJustUnlockedCheckpoint(newlyUnlocked);
          setShowCheckpointAlert(true);
        }
      } else if (isDemoMode()) {
        const unlocked = checkpoints.filter(cp => isUnlocked(cp.id));
        if (unlocked.length > 0) {
          setJustUnlockedCheckpoint(unlocked[unlocked.length - 1]);
          setShowCheckpointAlert(true);
        }
      }
    }
    prevUnlockedCountRef.current = unlockedCount;
  }, [unlockedCount, currentLocation, checkpoints, isUnlocked, isDemoMode]);

  return (
    <div className="h-screen flex flex-col bg-kai-grey-50 overflow-hidden relative">
      {/* Dynamic Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header
          title={viewMode === 'MAP' ? 'Peta Navigasi' : ''}
          showBack={true}
          variant={viewMode === 'MAP' ? 'white' : 'transparent'}
          rightAction={
            <button
              onClick={() => setViewMode(viewMode === 'MAP' ? 'DASHBOARD' : 'MAP')}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/30 transition-colors"
            >
              {viewMode === 'MAP' ? <BarChart3 className="w-5 h-5 text-kai-grey-900" /> : <MapIcon className="w-5 h-5 text-white" />}
            </button>
          }
        />
      </div>

      {/* KAY FAB - only visible during journey */}
      <KayFab showWelcomeNotification={showKayWelcome} />

      {showCheckpointAlert && (
        <CheckpointAlert
          checkpoint={justUnlockedCheckpoint}
          onClose={() => setShowCheckpointAlert(false)}
        />
      )}

      {viewMode === 'DASHBOARD' ? (
        <DashboardView
          progress={progress}
          unlockedCount={unlockedCount}
          checkpoints={checkpoints}
          nextCheckpoint={nextCheckpoint}
          currentLocation={currentLocation}
          isDemoMode={isDemoMode}
          setViewMode={setViewMode}
          setMapCenter={setMapCenter}
          navigate={navigate}
          unlockCheckpoint={unlockCheckpoint}
          isUnlocked={isUnlocked}
          routePolyline={route.polyline}
        />
      ) : (
        <div className="flex-1 relative z-0">
          <MapContainer
            center={mapCenter}
            zoom={10}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Polyline positions={route.polyline} color="#6366F1" weight={4} opacity={0.8} />

            {/* Station Markers */}
            {route.stations.map((station) => (
              <Marker
                key={station.id}
                position={[station.coordinates.lat, station.coordinates.lng]}
                icon={createStationIcon(station.type)}
              >
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold text-sm mb-1">{station.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{station.region}</p>
                    {station.facilities && (
                      <div className="text-xs text-gray-500">
                        <p className="font-semibold mb-1">Fasilitas:</p>
                        <ul className="text-left">
                          {station.facilities.slice(0, 3).map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Checkpoint Markers */}
            {checkpoints.map((checkpoint) => (
              <Marker
                key={checkpoint.id}
                position={[checkpoint.coordinates.lat, checkpoint.coordinates.lng]}
                icon={createCustomIcon('#6366F1', isUnlocked(checkpoint.id))}
                eventHandlers={{
                  click: () => {
                    if (isUnlocked(checkpoint.id)) {
                      navigate(`/bali-heritage/checkpoint/${checkpoint.id}`);
                    } else {
                      setSelectedCheckpoint(checkpoint);
                    }
                  }
                }}
              />
            ))}

            {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lng]} icon={userIcon} />}
            <RecenterMap position={viewMode === 'MAP' ? mapCenter : null} />
          </MapContainer>

          {/* Map Floating Dock */}
          <div className="absolute bottom-8 left-4 right-4 flex gap-3 z-[1000]">
            <div className="flex-1 bg-white rounded-xl p-3 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Target</p>
                <p className="font-bold text-sm truncate max-w-[120px]">{nextCheckpoint ? nextCheckpoint.name : 'Selesai!'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Jarak</p>
                <p className="font-bold text-kai-primary">
                  {currentLocation && nextCheckpoint
                    ? formatDistance(calculateDistance(currentLocation, nextCheckpoint.coordinates))
                    : '--'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (currentLocation) setMapCenter([currentLocation.lat, currentLocation.lng]);
              }}
              className="w-12 bg-kai-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
            >
              <Navigation className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
