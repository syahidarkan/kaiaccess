import { useUserStore } from '../../store/useUserStore';
import { useCheckpointStore } from '../../store/useCheckpointStore';
import { badges } from '../../data/badges';

export default function Profile() {
  const { earnedBadges, isDemoMode, toggleDemoMode } = useUserStore();
  const { getUnlockedCount } = useCheckpointStore();

  return (
    <div className="min-h-screen bg-kai-grey-50">
      <div className="bg-gradient-to-r from-kai-primary to-kai-purple text-white p-6 shadow-premium">
        <h1 className="text-2xl font-bold">Your Achievements</h1>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold mb-4">Progress</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Checkpoints Unlocked</span>
              <span className="font-bold text-kai-primary">{getUnlockedCount()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Badges Earned</span>
              <span className="font-bold text-kai-primary">{earnedBadges.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold mb-4">Badge Collection</h2>
          <div className="grid grid-cols-4 gap-3">
            {badges.slice(0, 12).map((badge) => {
              const earned = earnedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`aspect-square rounded-lg flex items-center justify-center text-3xl ${
                    earned ? 'bg-kai-primary/10' : 'bg-gray-100 opacity-30'
                  }`}
                >
                  {badge.icon}
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Demo Mode</p>
                <p className="text-xs text-gray-600">
                  Test features without real GPS tracking
                </p>
              </div>
              <button
                onClick={toggleDemoMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDemoMode() ? 'bg-warning' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDemoMode() ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isDemoMode() && (
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">🎮 Demo Mode is Active</span>
                  <br />
                  You can manually unlock checkpoints and test all features without GPS.
                  Journey simulation will auto-progress along the route.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
