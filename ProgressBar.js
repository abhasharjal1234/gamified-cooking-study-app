export default function ProgressBar({ progress, status }) {
  const getColor = () => {
    if (progress < 30) return 'bg-gray-400';
    if (progress < 60) return 'bg-yellow-400';
    if (progress < 90) return 'bg-orange-400';
    return 'bg-green-400';
  };

  const getStatusEmoji = () => {
    if (progress < 30) return '🥶';
    if (progress < 60) return '🔥';
    if (progress < 90) return '👨‍🍳';
    return '✨';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-bold text-lg">
          {getStatusEmoji()} {status}
        </span>
        <span className="text-white font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500 flex items-center justify-center text-xs font-bold text-gray-900`}
          style={{ width: `${progress}%` }}
        >
          {progress > 10 && `${progress}%`}
        </div>
      </div>
    </div>
  );
}
