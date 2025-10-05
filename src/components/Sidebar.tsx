import React from "react";
import {
  BarChart3,
  Package,
  TrendingUp,
  MapPin,
  PieChart,
  Users,
  Target,
  X,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "stock", label: "Stock Tracking", icon: Package },
    { id: "pricing", label: "Pricing Analysis", icon: TrendingUp },
    { id: "visits", label: "Store Visits", icon: MapPin },
    { id: "shelf", label: "Share of Shelf", icon: PieChart },
    { id: "competitors", label: "Competitor Pricing", icon: Users },
    { id: "presence", label: "Sales Presence", icon: Target },
  ];

  const handleItemClick = (id: string) => {
    setActiveView(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-[#1B2A49] text-white z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <img src="Logo.png" />
              {/* <h2 className="text-xl font-bold">FMCG Analytics</h2> */}
              {/* <p className="text-blue-300 text-sm">Sales Dashboard</p> */}
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-800 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Need Help?</h3>
            <p className="text-blue-300 text-xs mb-3">
              Contact support for assistance
            </p>
            <button className="w-full bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
              Get Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
