import React from "react";
import { Bell, Search, User, Menu, LogOut, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setSidebarOpen,
  activeView,
  setActiveView,
}) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const getTitle = (view: string) => {
    const titles: { [key: string]: string } = {
      dashboard: "Dashboard Overview",
      stock: "Stock Tracking",
      pricing: "Pricing Analysis",
      visits: "Store Visits",
      shelf: "Share of Shelf",
      competitors: "Competitor Pricing",
      presence: "Sales Presence",
    };
    return titles[view] || "Dashboard";
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1B2A49] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2A49]">
                {getTitle(activeView)}
              </h1>
              <p className="text-gray-600 text-sm">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              onClick={() => setActiveView("notifications")}
              className="relative p-2 text-gray-600 hover:text-[#F57C00] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#F57C00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative pl-4 border-l border-gray-200">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-[#2A2E33]">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-[#2A2E33]">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView("profile");
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
