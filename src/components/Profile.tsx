import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Shield,
  CreditCard as Edit3,
  Save,
  X,
  Camera,
  Bell,
  Lock,
  Globe,
  Smartphone,
} from "lucide-react";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    department: "Sales",
    joinDate: "2022-03-15",
    bio: "Experienced sales professional with 8+ years in FMCG industry. Specialized in retail partnerships and market expansion.",
    timezone: "EST (UTC-5)",
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    stockAlerts: true,
    priceChanges: true,
    visitReminders: true,
    weeklyReports: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    loginAlerts: true,
  });

  const handleSave = () => {
    updateUser({ name: formData.name, email: formData.email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const activityData = [
    {
      action: "Completed store visit",
      location: "Super Mart Downtown",
      time: "2 hours ago",
    },
    {
      action: "Updated pricing analysis",
      product: "Premium Biscuits",
      time: "1 day ago",
    },
    {
      action: "Generated weekly report",
      category: "Sales Performance",
      time: "3 days ago",
    },
    { action: "Scheduled store visits", count: "5 visits", time: "1 week ago" },
  ];

  const achievements = [
    {
      title: "Top Performer",
      description: "Exceeded sales targets for 6 consecutive months",
      date: "2024",
    },
    {
      title: "Store Coverage Champion",
      description: "Achieved 95% store coverage in assigned region",
      date: "2023",
    },
    {
      title: "Customer Satisfaction",
      description: "Maintained 4.8+ rating from store partners",
      date: "2023",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#1B2A49] to-[#2A3B5C] rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </div>
              <button className="absolute bottom-0 right-0 bg-white text-[#F57C00] p-2 rounded-full shadow-lg hover:shadow-xl transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-blue-200 text-lg mb-1">{user?.role}</p>
              <p className="text-blue-300 text-sm">Member since March 2022</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-[#1B2A49] px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="font-semibold text-[#2A2E33] mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Store Visits</span>
                <span className="font-semibold text-[#2A2E33]">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Reports Generated</span>
                <span className="font-semibold text-[#2A2E33]">43</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">
                  Target Achievement
                </span>
                <span className="font-semibold text-green-600">112%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#2A2E33]">
                    Personal Information
                  </h3>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-[#2A2E33] font-medium">
                        {formData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-[#2A2E33] font-medium">
                        {formData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-[#2A2E33] font-medium">
                        {formData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-[#2A2E33] font-medium">
                        {formData.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Department
                    </label>
                    <p className="text-[#2A2E33] font-medium">
                      {formData.department}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Join Date
                    </label>
                    <p className="text-[#2A2E33] font-medium">
                      {new Date(formData.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-600">{formData.bio}</p>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2A2E33] mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-[#F57C00] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-[#2A2E33]">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.location ||
                            activity.product ||
                            activity.category ||
                            activity.count}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2A2E33] mb-4">
                  Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-[#F6F9FF] to-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-[#F57C00]" />
                        <span className="text-xs text-gray-500">
                          {achievement.date}
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#2A2E33] mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2A2E33] mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-[#2A2E33] mb-4">
                    General Notifications
                  </h4>
                  <div className="space-y-4">
                    {Object.entries({
                      email: "Email Notifications",
                      push: "Push Notifications",
                      sms: "SMS Notifications",
                    }).map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              notifications[key as keyof typeof notifications]
                            }
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F57C00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F57C00]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#2A2E33] mb-4">
                    Business Alerts
                  </h4>
                  <div className="space-y-4">
                    {Object.entries({
                      stockAlerts: "Stock Level Alerts",
                      priceChanges: "Price Change Notifications",
                      visitReminders: "Visit Reminders",
                      weeklyReports: "Weekly Reports",
                    }).map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              notifications[key as keyof typeof notifications]
                            }
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F57C00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F57C00]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2A2E33] mb-6">
                Security Settings
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#2A2E33]">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          twoFactor: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F57C00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F57C00]"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        sessionTimeout: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#2A2E33]">Login Alerts</h4>
                    <p className="text-sm text-gray-600">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.loginAlerts}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          loginAlerts: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F57C00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F57C00]"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2A2E33] mb-6">
                Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                  >
                    <option value="EST (UTC-5)">EST (UTC-5)</option>
                    <option value="PST (UTC-8)">PST (UTC-8)</option>
                    <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                    <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
