export default function HPBar({ current, max, label, color = "red" }) {
  const percentage = Math.max(0, (current / max) * 100);
  
  const getBarColor = () => {
    if (color === "red") return "bg-red-500";
    if (color === "green") return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white font-bold">{label}</span>
        <span className="text-white font-bold">{current} / {max} HP</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden border-2 border-gray-800">
        <div
          className={`h-full ${getBarColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
