import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/useToast";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import StockTracking from "./components/StockTracking";
import PricingAnalysis from "./components/PricingAnalysis";
import StoreVisits from "./components/StoreVisits";
// import ShareOfShelf from "./components/ShareOfShelf";
import CompetitorPricing from "./components/CompetitorPricing";
import SalesPresence from "./components/SalesPresence";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import GlobalLoading from "./components/common/GlobalLoading";
import { ToastContainer } from "./components/common/Toast";
import ShareOfShelf from "./components/ShareofShelf";

function App() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { toasts, removeToast } = useToast();
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "stock":
        return <StockTracking />;
      case "pricing":
        return <PricingAnalysis />;
      case "visits":
        return <StoreVisits />;
      case "shelf":
        return <ShareOfShelf />;
      case "competitors":
        return <CompetitorPricing />;
      case "presence":
        return <SalesPresence />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      <GlobalLoading isLoading={false} />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 lg:ml-64">
          <Header
            setSidebarOpen={setSidebarOpen}
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}

export default App;
