import React from "react";

interface ChartProps {
  data: Array<{ month: string; value: number }>;
  type: "line" | "area" | "bar";
  height: number;
}

const Chart: React.FC<ChartProps> = ({ data, type, height }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const getY = (value: number) => {
    const normalizedValue = (value - minValue) / range;
    return height - normalizedValue * (height - 40) - 20;
  };

  const pathData = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = ((maxValue - point.value) / range) * (height - 40) + 20;
      return `${index === 0 ? "M" : "L"} ${x}% ${y}`;
    })
    .join(" ");

  const areaPath =
    type === "area"
      ? `${pathData} L 100% ${height - 20} L 0% ${height - 20} Z`
      : pathData;

  return (
    <div className="relative" style={{ height }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {type === "area" && (
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F57C00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F57C00" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        )}

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#f3f4f6"
            strokeWidth="0.5"
          />
        ))}

        {/* Chart line/area */}
        {type === "area" ? (
          <path
            d={areaPath}
            fill="url(#areaGradient)"
            stroke="#F57C00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d={pathData}
            fill="none"
            stroke="#F57C00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((maxValue - point.value) / range) * (height - 40) + 20;

          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={y}
              r="3"
              fill="#F57C00"
              stroke="white"
              strokeWidth="2"
              className="hover:r-4 transition-all duration-200"
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
        {data.map((point, index) => (
          <span key={index} className="text-xs text-gray-500 font-medium">
            {point.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Chart;
