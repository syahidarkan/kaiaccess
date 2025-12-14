import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, X, Info } from 'lucide-react';
import { useCheckpointStore } from '../../store/useCheckpointStore';
import { useJourneyStore } from '../../store/useJourneyStore';
import { calculateDistance, formatDistance, getDirectionTo } from '../../utils/distance';

export default function ARMode() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { checkpoints } = useCheckpointStore();
  const { currentLocation } = useJourneyStore();
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [nearbyCheckpoints, setNearbyCheckpoints] = useState([]);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (currentLocation) {
      // Find checkpoints within 5km
      const nearby = checkpoints
        .map(checkpoint => ({
          ...checkpoint,
          distance: calculateDistance(currentLocation, checkpoint.coordinates),
          direction: getDirectionTo(currentLocation, checkpoint.coordinates),
        }))
        .filter(cp => cp.distance <= 5000) // 5km radius
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Top 5 nearest

      setNearbyCheckpoints(nearby);
    }
  }, [currentLocation, checkpoints]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setCameraError(null);
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError(error.message);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);

      // Add AR frame overlay
      ctx.fillStyle = 'rgba(196, 30, 58, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 10;
      ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

      // Download or save
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bali-heritage-${Date.now()}.jpg`;
        a.click();
      });

      alert('📸 Photo captured with AR frame!');
    }
  };

  if (cameraError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold mb-2">Camera Access Required</h2>
          <p className="text-gray-300 mb-6">
            {cameraError}
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Please enable camera access in your browser settings to use AR mode.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-kai-primary text-white py-3 px-6 rounded-lg font-semibold"
          >
            Go Back
          </button>

          {/* Fallback: Show 360° viewer suggestion */}
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-sm text-gray-300">
              Alternative: View checkpoints in 360° mode from the checkpoint detail pages
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Camera view */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* AR Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crosshair in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Checkpoint markers */}
        {nearbyCheckpoints.map((checkpoint, index) => {
          // Simulate AR position based on distance and direction
          const topPosition = 30 + (index * 15);
          const leftPosition = 20 + (index * 10);

          return (
            <div
              key={checkpoint.id}
              className="absolute pointer-events-auto"
              style={{
                top: `${topPosition}%`,
                left: `${leftPosition}%`,
              }}
            >
              <div className="bg-black/70 backdrop-blur-sm text-white rounded-lg p-3 border border-kai-primary/50 shadow-premium">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-kai-orange rounded-full mt-1 animate-pulse" />
                  <div>
                    <p className="font-semibold text-sm">{checkpoint.name}</p>
                    <p className="text-xs text-gray-300">{formatDistance(checkpoint.distance)}</p>
                    <p className="text-xs text-kai-primary">{checkpoint.direction.direction}</p>
                  </div>
                </div>
              </div>

              {/* Connecting line to marker */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-kai-primary/30" />
            </div>
          );
        })}

        {/* Distance rings */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 border-2 border-kai-primary/20 rounded-full" />
            <div className="absolute inset-4 border-2 border-kai-primary/30 rounded-full" />
            <div className="absolute inset-8 border-2 border-kai-primary/40 rounded-full" />

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full" />

            {/* Checkpoint dots on radar */}
            {nearbyCheckpoints.slice(0, 3).map((cp, index) => {
              const angle = (index * 120) * (Math.PI / 180);
              const radius = 60;
              const x = 96 + radius * Math.cos(angle);
              const y = 96 + radius * Math.sin(angle);

              return (
                <div
                  key={cp.id}
                  className="absolute w-2 h-2 bg-kai-primary rounded-full"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 safe-area-top z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <p className="text-sm font-semibold">AR Mode</p>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
          >
            {showInfo ? <X className="w-6 h-6" /> : <Info className="w-6 h-6" />}
          </button>
        </div>

        {/* Info panel */}
        {showInfo && (
          <div className="mt-4 bg-black/70 backdrop-blur-sm text-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">How to use AR Mode:</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Point your camera at the surroundings</li>
              <li>• Look for checkpoint markers in AR space</li>
              <li>• Distance and direction shown for each checkpoint</li>
              <li>• Tap capture button to take AR photos</li>
            </ul>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 safe-area-bottom z-10">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleCapture}
            className="bg-kai-primary text-white p-4 rounded-full shadow-lg hover:bg-kai-primary-dark transition-colors"
          >
            <Camera className="w-8 h-8" />
          </button>
        </div>

        {/* Nearby count */}
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            {nearbyCheckpoints.length} checkpoints nearby
          </p>
        </div>
      </div>

      {/* Instruction overlay (first time) */}
      {currentLocation && nearbyCheckpoints.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 m-6 max-w-sm text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold mb-2">No Checkpoints Nearby</h3>
            <p className="text-sm text-gray-600">
              Move closer to checkpoint locations to see them in AR mode
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
