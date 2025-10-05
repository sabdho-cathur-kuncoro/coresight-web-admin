import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useModal } from "../hooks/useModal";
import KPICard from "./common/KPICard";
import Chart from "./common/Chart";
import Modal from "./common/Modal";
import ConfirmModal from "./common/ConfirmModal";
import {
  TrendingUp,
  Package,
  MapPin,
  PieChart,
  AlertTriangle,
  Target,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { success, error, warning, info } = useToast();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isConfirmOpen,
    openModal: openConfirm,
    closeModal: closeConfirm,
  } = useModal();

  const kpiData = [
    {
      title: "Total Revenue",
      value: "₹24.5M",
      change: 12.5,
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Stock Availability",
      value: "87%",
      change: -3.2,
      icon: Package,
      color: "blue",
    },
    {
      title: "Store Coverage",
      value: "342",
      change: 8.1,
      icon: MapPin,
      color: "green",
    },
    {
      title: "Market Share",
      value: "23.8%",
      change: 1.4,
      icon: PieChart,
      color: "purple",
    },
  ];

  const salesData = [
    { month: "Jan", value: 2.4 },
    { month: "Feb", value: 1.8 },
    { month: "Mar", value: 3.2 },
    { month: "Apr", value: 2.9 },
    { month: "May", value: 3.8 },
    { month: "Jun", value: 4.2 },
  ];

  const stockAlerts = [
    {
      product: "Biscuits Premium",
      stores: 12,
      level: "critical",
      lastUpdated: "2 hours ago",
    },
    {
      product: "Chocolate Bars",
      stores: 8,
      level: "warning",
      lastUpdated: "4 hours ago",
    },
    {
      product: "Energy Drinks",
      stores: 15,
      level: "critical",
      lastUpdated: "1 hour ago",
    },
    {
      product: "Instant Noodles",
      stores: 6,
      level: "warning",
      lastUpdated: "6 hours ago",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Stock replenishment completed",
      store: "Super Mart Downtown",
      time: "30 minutes ago",
      user: "John Smith",
    },
    {
      id: 2,
      action: "Price update approved",
      product: "Premium Biscuits",
      time: "1 hour ago",
      user: "Sarah Johnson",
    },
    {
      id: 3,
      action: "Store visit scheduled",
      store: "Quick Shop Plaza",
      time: "2 hours ago",
      user: "Mike Wilson",
    },
    {
      id: 4,
      action: "Competitor analysis updated",
      category: "Beverages",
      time: "3 hours ago",
      user: "Lisa Brown",
    },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "visit":
        success(
          "Store Visit Scheduled",
          "Your visit has been scheduled successfully"
        );
        break;
      case "stock":
        info("Stock Update", "Redirecting to stock management...");
        break;
      case "pricing":
        warning("Price Analysis", "Some competitor prices have changed");
        break;
      case "report":
        openModal();
        break;
    }
  };

  const handleGenerateReport = () => {
    closeModal();
    openConfirm();
  };

  const confirmGenerateReport = () => {
    closeConfirm();
    success(
      "Report Generated",
      "Your performance report is ready for download"
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1B2A49] to-[#2A3B5C] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Good morning, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-blue-200">
              Here's what's happening with your sales activities today.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Last login</div>
            <div className="text-lg font-semibold">
              {user?.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "Today"}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Sales Trend Chart */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#2A2E33]">
                  Sales Performance
                </h3>
                <p className="text-gray-600 text-sm">Monthly revenue trends</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-[#F6F9FF] text-[#1B2A49] rounded-lg text-sm font-medium">
                  6M
                </button>
                <button className="px-3 py-1 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white rounded-lg text-sm font-medium">
                  1Y
                </button>
              </div>
            </div>
            <Chart data={salesData} type="area" height={300} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#2A2E33]">
              Recent Activities
            </h3>
            <button className="text-[#F57C00] hover:text-[#E65100] text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 bg-[#F57C00] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-[#2A2E33]">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {activity.store || activity.product || activity.category} •{" "}
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Stock Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-lg font-semibold text-[#2A2E33]">
              Stock Alerts
            </h3>
          </div>

          <div className="space-y-4">
            {stockAlerts.map((alert, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-[#2A2E33] text-sm">
                    {alert.product}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.level === "critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-1">
                  {alert.stores} stores affected
                </p>
                <p className="text-gray-400 text-xs">
                  Updated {alert.lastUpdated}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
            View All Alerts
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-[#2A2E33] mb-6">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => handleQuickAction("visit")}
              className="w-full text-left p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <div className="font-medium text-sm">Schedule Store Visit</div>
              <div className="text-xs opacity-90">
                Plan your next store inspection
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("stock")}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-sm text-blue-700">
                Update Stock Levels
              </div>
              <div className="text-xs text-blue-600">
                Manage inventory across stores
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("pricing")}
              className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-sm text-green-700">
                Price Analysis
              </div>
              <div className="text-xs text-green-600">
                Review competitor pricing
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("report")}
              className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-sm text-purple-700">
                Generate Report
              </div>
              <div className="text-xs text-purple-600">
                Create performance summary
              </div>
            </button>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2A2E33]">
                Top Regions
              </h3>
              <p className="text-gray-600 text-sm">Performance overview</p>
            </div>
            <Target className="w-5 h-5 text-[#F57C00]" />
          </div>

          <div className="space-y-4">
            {["North", "Central", "South"].map((region, index) => {
              const performance = [92, 78, 85][index];
              const stores = [128, 97, 117][index];

              return (
                <div
                  key={region}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-[#2A2E33]">
                      {region} Region
                    </div>
                    <div className="text-sm text-gray-600">{stores} stores</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#2A2E33]">
                      {performance}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Generation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Generate Performance Report"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none">
              <option>Weekly Performance Summary</option>
              <option>Monthly Sales Report</option>
              <option>Stock Analysis Report</option>
              <option>Competitor Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
              />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="includeCharts" className="rounded" />
            <label htmlFor="includeCharts" className="text-sm text-gray-700">
              Include charts and visualizations
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Generate Report
          </button>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={confirmGenerateReport}
        title="Generate Report"
        message="Are you sure you want to generate this performance report? This may take a few minutes to process."
        type="info"
        confirmText="Generate"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Dashboard;
