import React, { useState } from "react";
import {
  Bell,
  Check,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  Search,
} from "lucide-react";

const Notifications: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const notifications = [
    {
      id: 1,
      type: "critical",
      title: "Critical Stock Alert",
      message: "Premium Biscuits stock critically low in 12 stores",
      timestamp: "5 minutes ago",
      read: false,
      category: "stock",
      actionRequired: true,
      details: "Immediate restocking required to prevent stockouts",
    },
    {
      id: 2,
      type: "warning",
      title: "Price Change Detected",
      message: "Competitor A increased Energy Drinks price by 8%",
      timestamp: "1 hour ago",
      read: false,
      category: "pricing",
      actionRequired: true,
      details: "Consider adjusting our pricing strategy",
    },
    {
      id: 3,
      type: "success",
      title: "Store Visit Completed",
      message: "John Smith completed visit to Super Mart Downtown",
      timestamp: "2 hours ago",
      read: true,
      category: "visits",
      actionRequired: false,
      details: "All objectives met, positive feedback received",
    },
    {
      id: 4,
      type: "info",
      title: "Weekly Report Ready",
      message: "Sales performance report for Week 23 is available",
      timestamp: "4 hours ago",
      read: true,
      category: "reports",
      actionRequired: false,
      details: "Review key metrics and trends",
    },
    {
      id: 5,
      type: "warning",
      title: "Shelf Space Opportunity",
      message: "Metro Grocery has additional shelf space available",
      timestamp: "6 hours ago",
      read: false,
      category: "shelf",
      actionRequired: true,
      details: "Contact store manager to discuss expansion",
    },
    {
      id: 6,
      type: "critical",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight 11 PM - 2 AM",
      timestamp: "8 hours ago",
      read: true,
      category: "system",
      actionRequired: false,
      details: "Dashboard will be temporarily unavailable",
    },
    {
      id: 7,
      type: "success",
      title: "Target Achievement",
      message: "North Region exceeded monthly sales target by 15%",
      timestamp: "1 day ago",
      read: true,
      category: "performance",
      actionRequired: false,
      details: "Congratulations to the North Region team!",
    },
    {
      id: 8,
      type: "info",
      title: "New Product Launch",
      message: "Chocolate Deluxe series launching next month",
      timestamp: "2 days ago",
      read: true,
      category: "products",
      actionRequired: false,
      details: "Prepare stores for new product placement",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "success":
        return "border-l-green-500 bg-green-50";
      case "info":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      id: "critical",
      label: "Critical",
      count: notifications.filter((n) => n.type === "critical").length,
    },
    {
      id: "actionRequired",
      label: "Action Required",
      count: notifications.filter((n) => n.actionRequired).length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notification.read) ||
      (selectedFilter === "critical" && notification.type === "critical") ||
      (selectedFilter === "actionRequired" && notification.actionRequired);

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: number) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log("Marking all notifications as read");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#2A2E33]">Notifications</h2>
            <p className="text-gray-600">
              Stay updated with your sales activities
            </p>
          </div>
          <button
            onClick={markAllAsRead}
            className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Mark All Read
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedFilter === filter.id
                      ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
                !notification.read ? "border-l-4" : ""
              } ${
                !notification.read
                  ? getNotificationColor(notification.type)
                  : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3
                          className={`font-semibold ${
                            !notification.read
                              ? "text-[#2A2E33]"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#F57C00] rounded-full"></div>
                        )}
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                            Action Required
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mb-2 ${
                          !notification.read ? "text-gray-700" : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {notification.details}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {notification.timestamp}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                          {notification.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {notification.actionRequired && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                        Take Action
                      </button>
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {notifications.filter((n) => n.type === "critical").length}
          </div>
          <div className="text-gray-600 text-sm">Critical Alerts</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            {notifications.filter((n) => n.actionRequired).length}
          </div>
          <div className="text-gray-600 text-sm">Action Required</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {notifications.filter((n) => !n.read).length}
          </div>
          <div className="text-gray-600 text-sm">Unread</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-[#F57C00] mb-2">
            {notifications.length}
          </div>
          <div className="text-gray-600 text-sm">Total</div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
