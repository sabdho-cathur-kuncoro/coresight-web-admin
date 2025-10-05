import React from "react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => {
  const isPositive = change > 0;

  const getColorClasses = (color: string) => {
    const colors = {
      orange: "bg-gradient-to-r from-orange-500 to-amber-500",
      blue: "bg-gradient-to-r from-blue-500 to-indigo-500",
      green: "bg-gradient-to-r from-green-500 to-emerald-500",
      purple: "bg-gradient-to-r from-purple-500 to-violet-500",
    };
    return colors[color as keyof typeof colors] || colors.orange;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[#2A2E33] mb-1">{value}</h3>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;
