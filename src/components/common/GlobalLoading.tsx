import React from "react";
// import { Loader2 } from "lucide-react";

interface GlobalLoadingProps {
  isLoading: boolean;
  message?: string;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  isLoading,
  message = "Loading...",
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#2A2E33] mb-2">
            Please Wait
          </h3>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
